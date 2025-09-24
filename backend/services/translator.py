import requests
import json
import time
from typing import Optional

class SimpleTranslator:
    """Service de traduction simple pour convertir les articles en français"""
    
    def __init__(self):
        # On peut utiliser plusieurs services de traduction gratuits
        self.services = [
            "mymemory",  # MyMemory API gratuite
            "simple"     # Traduction basique avec dictionnaire
        ]
        
        # Cache pour éviter de traduire plusieurs fois le même texte
        self.translation_cache = {}
        
    def translate_to_french(self, text: str) -> str:
        """Traduit un texte en français"""
        if not text or len(text.strip()) == 0:
            return text
            
        # Vérifier si déjà en cache
        cache_key = hash(text[:100])  # Utiliser les 100 premiers caractères comme clé
        if cache_key in self.translation_cache:
            return self.translation_cache[cache_key]
        
        # Essayer les différents services
        for service in self.services:
            try:
                translated = self._translate_with_service(text, service)
                if translated and translated != text:
                    self.translation_cache[cache_key] = translated
                    return translated
                    
            except Exception as e:
                print(f"⚠️  Erreur traduction avec {service}: {e}")
                continue
        
        # Si aucune traduction ne fonctionne, retourner le texte original
        return text
    
    def _translate_with_service(self, text: str, service: str) -> Optional[str]:
        """Traduit avec un service spécifique"""
        
        if service == "mymemory":
            return self._translate_mymemory(text)
        elif service == "simple":
            return self._translate_simple(text)
            
        return None
    
    def _translate_mymemory(self, text: str) -> Optional[str]:
        """Traduction via MyMemory API (gratuite)"""
        try:
            # Limiter la longueur du texte (MyMemory a une limite)
            if len(text) > 500:
                text = text[:500] + "..."
                
            url = "https://api.mymemory.translated.net/get"
            params = {
                'q': text,
                'langpair': 'en|fr'
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data.get('responseStatus') == 200:
                translated = data.get('responseData', {}).get('translatedText')
                if translated:
                    return translated
                    
        except Exception as e:
            print(f"Erreur MyMemory: {e}")
            
        return None
    
    def _translate_simple(self, text: str) -> str:
        """Traduction basique avec remplacement de mots clés"""
        
        # Dictionnaire de traductions pour les termes techniques Windows
        translations = {
            # Termes techniques
            'Windows Server': 'Windows Server',
            'Windows 11': 'Windows 11',
            'Windows 10': 'Windows 10',
            'Windows': 'Windows',
            'Microsoft': 'Microsoft',
            'update': 'mise à jour',
            'security update': 'mise à jour de sécurité',
            'security': 'sécurité',
            'patch': 'correctif',
            'vulnerability': 'vulnérabilité',
            'critical': 'critique',
            'important': 'important',
            'moderate': 'modéré',
            'low': 'faible',
            'release': 'version',
            'feature': 'fonctionnalité',
            'features': 'fonctionnalités',
            'new features': 'nouvelles fonctionnalités',
            'performance': 'performance',
            'improvements': 'améliorations',
            'bug fix': 'correction de bug',
            'bug fixes': 'corrections de bugs',
            'hotfix': 'correctif urgent',
            'enterprise': 'entreprise',
            'server': 'serveur',
            'datacenter': 'centre de données',
            'cloud': 'cloud',
            'Azure': 'Azure',
            'download': 'télécharger',
            'install': 'installer',
            'installation': 'installation',
            'upgrade': 'mise à niveau',
            'support': 'support',
            'end of support': 'fin de support',
            'end-of-life': 'fin de vie',
            'preview': 'aperçu',
            'beta': 'bêta',
            'stable': 'stable',
            'available': 'disponible',
            'now available': 'maintenant disponible',
            'generally available': 'généralement disponible',
            'public preview': 'aperçu public',
            
            # Phrases courantes
            'This post': 'Cet article',
            'The post': 'L\'article',
            'appeared first on': 'est paru en premier sur',
            'Learn more about': 'En savoir plus sur',
            'Get started with': 'Commencer avec',
            'How to': 'Comment',
            'What\'s new': 'Nouveautés',
            'Announcing': 'Annonce',
            'We are excited to announce': 'Nous sommes ravis d\'annoncer',
            'We are pleased to announce': 'Nous avons le plaisir d\'annoncer'
        }
        
        translated_text = text
        for english, french in translations.items():
            translated_text = translated_text.replace(english, french)
            
        return translated_text
    
    def is_french_content(self, text: str) -> bool:
        """Détecte si le contenu est déjà en français"""
        french_indicators = [
            'de la', 'de le', 'du ', 'des ', 'le ', 'la ', 'les ',
            'mise à jour', 'sécurité', 'disponible', 'nouveau',
            'nouvelle', 'fonctionnalité', 'amélioration', 'article',
            'Microsoft France', 'en français'
        ]
        
        text_lower = text.lower()
        french_count = sum(1 for indicator in french_indicators if indicator in text_lower)
        
        # Si on trouve plusieurs indicateurs français, c'est probablement du français
        return french_count >= 3

# Instance globale
translator = SimpleTranslator()