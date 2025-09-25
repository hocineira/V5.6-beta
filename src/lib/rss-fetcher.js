// Service RSS pour récupérer et traiter les flux Windows
import { parseStringPromise } from 'xml2js';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

class WindowsRSSFetcher {
  constructor() {
    this.sources = {
      microsoft_france: {
        url: "https://news.microsoft.com/fr-fr/feed/",
        name: "Microsoft France Actualités",
        category: "feature",
        language: "fr"
      },
      microsoft_security: {
        url: "https://msrc.microsoft.com/blog/rss",
        name: "Microsoft Security Response Center",
        category: "security", 
        language: "en"
      },
      windows_blog: {
        url: "https://blogs.windows.com/feed/",
        name: "Official Windows Blog",
        category: "feature",
        language: "en"
      },
      windows_server: {
        url: "https://cloudblogs.microsoft.com/windowsserver/feed/",
        name: "Windows Server Blog",
        category: "server",
        language: "en"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      console.log(`📡 Récupération du feed : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      console.log(`✅ ${updates.length} mises à jour récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      console.error(`❌ Erreur récupération feed ${sourceKey}:`, error);
      return [];
    }
  }

  parseRSSFeed(xmlText, source) {
    try {
      // Simple XML parsing for RSS
      const itemRegex = /<item>(.*?)<\/item>/gs;
      const items = [];
      let match;

      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemXml = match[1];
        const item = this.parseRSSItem(itemXml, source);
        if (item && this.isRelevantForWindows(item)) {
          items.push(item);
        }
      }

      return items.slice(0, 20); // Limit to 20 recent entries
    } catch (error) {
      console.error('Erreur parsing RSS:', error);
      return [];
    }
  }

  parseRSSItem(itemXml, source) {
    try {
      // Extract basic fields
      const title = this.extractXmlTag(itemXml, 'title') || "Sans titre";
      const link = this.extractXmlTag(itemXml, 'link') || "";
      const description = this.cleanHtml(this.extractXmlTag(itemXml, 'description') || "");
      const pubDate = this.extractXmlTag(itemXml, 'pubDate') || new Date().toISOString();

      // Parse publication date
      let publishedDate = new Date();
      try {
        publishedDate = new Date(pubDate);
      } catch (e) {
        publishedDate = new Date();
      }

      // Translation if needed
      let finalTitle = title;
      let finalDescription = description.substring(0, 1000);

      if (source.language === "en") {
        if (!this.isFrenchContent(title + " " + description)) {
          finalTitle = this.translateSimple(title);
          if (description.length > 50) {
            finalDescription = this.translateSimple(description.substring(0, 500));
          }
        }
      }

      // Extract Windows version
      const version = this.extractWindowsVersion(title + " " + description);
      
      // Extract KB number  
      const kbNumber = this.extractKbNumber(title + " " + description);
      
      // Extract severity for security updates
      const severity = this.extractSeverity(title + " " + description);
      
      // Generate tags
      const tags = this.generateTags(title, description, source.category);

      return {
        id: this.generateId(title, link),
        title: finalTitle,
        description: finalDescription,
        link: link,
        published_date: publishedDate.toISOString(),
        category: source.category,
        version: version,
        kb_number: kbNumber,
        severity: severity,
        tags: tags,
        source: source.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

    } catch (error) {
      console.error('Erreur parsing item RSS:', error);
      return null;
    }
  }

  extractXmlTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'is');
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
  }

  cleanHtml(htmlText) {
    if (!htmlText) return "";
    
    // Remove HTML tags
    let text = htmlText.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    return text.trim();
  }

  extractWindowsVersion(text) {
    const textLower = text.toLowerCase();
    
    const patterns = [
      /windows\s+11\s+24h2/,
      /windows\s+11\s+23h2/,
      /windows\s+11/,
      /windows\s+server\s+2025/,
      /windows\s+server\s+2022/,
      /windows\s+server\s+2019/,
      /windows\s+10\s+22h2/,
      /windows\s+10/
    ];
    
    for (const pattern of patterns) {
      const match = textLower.match(pattern);
      if (match) {
        return match[0].replace(/\s+/g, ' ').trim();
      }
    }
    
    return null;
  }

  extractKbNumber(text) {
    const kbPattern = /KB\d{7}/i;
    const match = text.match(kbPattern);
    return match ? match[0] : null;
  }

  extractSeverity(text) {
    const textLower = text.toLowerCase();
    
    if (/critical|critique|zero-day/.test(textLower)) {
      return "Critical";
    } else if (/important|importante/.test(textLower)) {
      return "Important";  
    } else if (/moderate|modérée/.test(textLower)) {
      return "Moderate";
    } else if (/low|faible/.test(textLower)) {
      return "Low";
    }
    
    return null;
  }

  generateTags(title, description, category) {
    const text = (title + " " + description).toLowerCase();
    const tags = [];
    
    // Technical keywords
    const techKeywords = {
      'security': ['sécurité', 'vulnerability', 'vulnérabilité', 'patch', 'exploit'],
      'server': ['server', 'serveur', 'datacenter', 'enterprise'],
      'update': ['update', 'mise à jour', 'upgrade', 'installation'],
      'feature': ['feature', 'fonctionnalité', 'nouveau', 'amélioration'],
      'bug': ['bug', 'fix', 'correction', 'résolution', 'problème']
    };
    
    for (const [tag, keywords] of Object.entries(techKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }
    
    // Always add category
    if (!tags.includes(category)) {
      tags.push(category);
    }
    
    return tags;
  }

  isRelevantForWindows(update) {
    const text = (update.title + " " + update.description).toLowerCase();
    
    const relevantKeywords = [
      'windows', 'server', 'update', 'security', 'patch', 'kb',
      'vulnerability', 'feature', 'upgrade', 'installation'
    ];
    
    return relevantKeywords.some(keyword => text.includes(keyword));
  }

  translateSimple(text) {
    if (!text) return text;

    const translations = {
      // Technical terms
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
      
      // Common phrases
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
    };
    
    let translatedText = text;
    for (const [english, french] of Object.entries(translations)) {
      translatedText = translatedText.replace(new RegExp(english, 'gi'), french);
    }
    
    return translatedText;
  }

  isFrenchContent(text) {
    const frenchIndicators = [
      'de la', 'de le', 'du ', 'des ', 'le ', 'la ', 'les ',
      'mise à jour', 'sécurité', 'disponible', 'nouveau',
      'nouvelle', 'fonctionnalité', 'amélioration', 'article',
      'Microsoft France', 'en français'
    ];
    
    const textLower = text.toLowerCase();
    const frenchCount = frenchIndicators.filter(indicator => 
      textLower.includes(indicator)
    ).length;
    
    return frenchCount >= 3;
  }

  generateId(title, link) {
    // Generate a simple hash-like ID
    const text = title + link;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  async fetchAllFeeds() {
    const allUpdates = [];
    
    for (const sourceKey of Object.keys(this.sources)) {
      try {
        const updates = await this.fetchFeed(sourceKey);
        allUpdates.push(...updates);
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Erreur source ${sourceKey}:`, error);
        continue;
      }
    }
    
    // Sort by publication date (newest first)
    allUpdates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    
    console.log(`🎯 Total mises à jour récupérées : ${allUpdates.length}`);
    return allUpdates;
  }
}

export const rssFetcher = new WindowsRSSFetcher();