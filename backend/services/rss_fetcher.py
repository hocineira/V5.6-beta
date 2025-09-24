import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from typing import List, Dict
import re
import time
from dateutil import parser as date_parser

class WindowsRSSFetcher:
    def __init__(self):
        self.sources = {
            "microsoft_security": {
                "url": "https://msrc.microsoft.com/blog/rss",
                "name": "Microsoft Security Response Center",
                "category": "security"
            },
            "windows_blog": {
                "url": "https://blogs.windows.com/feed/",
                "name": "Official Windows Blog", 
                "category": "feature"
            },
            "windows_server": {
                "url": "https://cloudblogs.microsoft.com/windowsserver/feed/",
                "name": "Windows Server Blog",
                "category": "server"
            }
        }
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

    def fetch_feed(self, source_key: str) -> List[Dict]:
        """Récupère et parse un feed RSS spécifique"""
        try:
            source = self.sources[source_key]
            print(f"📡 Récupération du feed : {source['name']}")
            
            # Récupération du feed
            response = self.session.get(source["url"], timeout=30)
            response.raise_for_status()
            
            # Parse du feed RSS
            feed = feedparser.parse(response.content)
            
            updates = []
            for entry in feed.entries[:20]:  # Limite à 20 entrées récentes
                try:
                    update = self._parse_entry(entry, source)
                    if update and self._is_relevant_for_windows(update):
                        updates.append(update)
                except Exception as e:
                    print(f"⚠️  Erreur parsing entrée : {e}")
                    continue
            
            print(f"✅ {len(updates)} mises à jour récupérées de {source['name']}")
            return updates
            
        except Exception as e:
            print(f"❌ Erreur récupération feed {source_key} : {e}")
            return []

    def _parse_entry(self, entry, source) -> Dict:
        """Parse une entrée RSS individuelle"""
        # Date de publication
        published_date = datetime.now()
        if hasattr(entry, 'published'):
            try:
                published_date = date_parser.parse(entry.published)
            except:
                pass
        elif hasattr(entry, 'updated'):
            try:
                published_date = date_parser.parse(entry.updated)
            except:
                pass

        # Description nettoyée
        description = ""
        if hasattr(entry, 'summary'):
            description = self._clean_html(entry.summary)
        elif hasattr(entry, 'description'):
            description = self._clean_html(entry.description)

        # Extraction des informations Windows
        title = entry.title if hasattr(entry, 'title') else "Sans titre"
        link = entry.link if hasattr(entry, 'link') else ""
        
        # Détection automatique de version Windows
        version = self._extract_windows_version(title + " " + description)
        
        # Détection du numéro KB
        kb_number = self._extract_kb_number(title + " " + description)
        
        # Classification de sévérité pour les mises à jour de sécurité
        severity = self._extract_severity(title + " " + description)
        
        # Tags automatiques
        tags = self._generate_tags(title, description, source["category"])

        return {
            "title": title,
            "description": description[:1000],  # Limite la longueur
            "link": link,
            "published_date": published_date,
            "category": source["category"],
            "version": version,
            "kb_number": kb_number,
            "severity": severity,
            "tags": tags,
            "source": source_key
        }

    def _clean_html(self, html_text: str) -> str:
        """Nettoie le contenu HTML"""
        if not html_text:
            return ""
        soup = BeautifulSoup(html_text, 'html.parser')
        return soup.get_text().strip()

    def _extract_windows_version(self, text: str) -> str:
        """Extrait la version Windows mentionnée"""
        text_lower = text.lower()
        
        patterns = [
            r'windows\s+11\s+24h2',
            r'windows\s+11\s+23h2', 
            r'windows\s+11',
            r'windows\s+server\s+2025',
            r'windows\s+server\s+2022',
            r'windows\s+server\s+2019',
            r'windows\s+10\s+22h2',
            r'windows\s+10'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text_lower)
            if match:
                return match.group().title()
                
        return None

    def _extract_kb_number(self, text: str) -> str:
        """Extrait le numéro KB (Knowledge Base)"""
        kb_pattern = r'KB\d{7}'
        match = re.search(kb_pattern, text, re.IGNORECASE)
        return match.group() if match else None

    def _extract_severity(self, text: str) -> str:
        """Détermine la sévérité d'une mise à jour de sécurité"""
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['critical', 'critique', 'zero-day']):
            return "Critical"
        elif any(word in text_lower for word in ['important', 'importante']):
            return "Important"
        elif any(word in text_lower for word in ['moderate', 'modérée']):
            return "Moderate"
        elif any(word in text_lower for word in ['low', 'faible']):
            return "Low"
            
        return None

    def _generate_tags(self, title: str, description: str, category: str) -> List[str]:
        """Génère des tags automatiquement"""
        text = (title + " " + description).lower()
        tags = []
        
        # Tags techniques
        tech_keywords = {
            'security': ['sécurité', 'vulnerability', 'vulnérabilité', 'patch', 'exploit'],
            'server': ['server', 'serveur', 'datacenter', 'enterprise'],
            'update': ['update', 'mise à jour', 'upgrade', 'installation'],
            'feature': ['feature', 'fonctionnalité', 'nouveau', 'amélioration'],
            'bug': ['bug', 'fix', 'correction', 'résolution', 'problème']
        }
        
        for tag, keywords in tech_keywords.items():
            if any(keyword in text for keyword in keywords):
                tags.append(tag)
        
        # Toujours ajouter la catégorie
        if category not in tags:
            tags.append(category)
            
        return tags

    def _is_relevant_for_windows(self, update: Dict) -> bool:
        """Vérifie si l'update est pertinente pour Windows"""
        text = (update["title"] + " " + update["description"]).lower()
        
        # Mots-clés pertinents
        relevant_keywords = [
            'windows', 'server', 'update', 'security', 'patch', 'kb', 
            'vulnerability', 'feature', 'upgrade', 'installation'
        ]
        
        return any(keyword in text for keyword in relevant_keywords)

    def fetch_all_feeds(self) -> List[Dict]:
        """Récupère toutes les sources RSS"""
        all_updates = []
        
        for source_key in self.sources.keys():
            try:
                updates = self.fetch_feed(source_key)
                all_updates.extend(updates)
                time.sleep(2)  # Pause entre les requêtes
            except Exception as e:
                print(f"❌ Erreur source {source_key}: {e}")
                continue
        
        # Tri par date de publication (plus récent en premier)
        all_updates.sort(key=lambda x: x["published_date"], reverse=True)
        
        print(f"🎯 Total mises à jour récupérées : {len(all_updates)}")
        return all_updates

# Instance globale
rss_fetcher = WindowsRSSFetcher()