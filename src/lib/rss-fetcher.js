// Service RSS pour récupérer et traiter les flux Windows
import { parseStringPromise } from &apos;xml2js&apos;;
import { formatDistanceToNow } from &apos;date-fns&apos;;
import { fr } from &apos;date-fns/locale&apos;;
import { logger } from &apos;./logger&apos;;

class WindowsRSSFetcher {
  constructor() {
    this.sources = {
      windows_server: {
        url: "https://cloudblogs.microsoft.com/windowsserver/feed/",
        name: "Windows Server Blog",
        category: "server",
        language: "en"
      },
      microsoft_security: {
        url: "https://www.microsoft.com/en-us/security/blog/feed/",
        name: "Microsoft Security Response Center",
        category: "security", 
        language: "en"
      },
      sql_server: {
        url: "https://www.microsoft.com/en-us/sql-server/blog/feed/",
        name: "SQL Server Blog",
        category: "server",
        language: "en"
      },
      azure_blog: {
        url: "https://azure.microsoft.com/fr-fr/blog/feed/",
        name: "Azure Blog",
        category: "cloud",
        language: "en"
      },
      powershell: {
        url: "https://devblogs.microsoft.com/powershell/feed/",
        name: "PowerShell Blog",
        category: "enterprise",
        language: "en"
      },
      dotnet: {
        url: "https://devblogs.microsoft.com/dotnet/feed/",
        name: ".NET Blog",
        category: "enterprise",
        language: "en"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      logger.rss(`📡 Récupération du feed : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          &apos;User-Agent&apos;: &apos;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36&apos;
        },
        next: { revalidate: parseInt(process.env.NEXT_PUBLIC_RSS_CACHE_TIME) || 3600 } // Cache configurable
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      logger.rss(`✅ ${updates.length} mises à jour récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      logger.error(`❌ Erreur récupération feed ${sourceKey}:`, error);
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
      logger.error(&apos;Erreur parsing RSS:&apos;, error);
      return [];
    }
  }

  parseRSSItem(itemXml, source) {
    try {
      // Extract basic fields
      const title = this.extractXmlTag(itemXml, &apos;title&apos;) || "Sans titre";
      const link = this.extractXmlTag(itemXml, &apos;link&apos;) || "";
      const description = this.cleanHtml(this.extractXmlTag(itemXml, &apos;description&apos;) || "");
      const pubDate = this.extractXmlTag(itemXml, &apos;pubDate&apos;) || new Date().toISOString();

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
      logger.error(&apos;Erreur parsing item RSS:&apos;, error);
      return null;
    }
  }

  extractXmlTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, &apos;is&apos;);
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
  }

  cleanHtml(htmlText) {
    if (!htmlText) return "";
    
    // Remove HTML tags
    let text = htmlText.replace(/<[^>]*>/g, &apos;&apos;);
    
    // Remove XML artifacts and CDATA
    text = text.replace(/\]\]>/g, &apos;&apos;);
    text = text.replace(/\[CDATA\[/g, &apos;&apos;);
    text = text.replace(/^<!\[CDATA\[/g, &apos;&apos;);
    text = text.replace(/\]\]>$/g, &apos;&apos;);
    
    // Decode HTML entities
    text = text
      .replace(/&amp;/g, &apos;&&apos;)
      .replace(/&lt;/g, &apos;<&apos;)
      .replace(/&gt;/g, &apos;>&apos;)
      .replace(/&quot;/g, &apos;"&apos;)
      .replace(/&#39;/g, "&apos;")
      .replace(/&nbsp;/g, &apos; &apos;);
    
    // Clean up extra whitespace and newlines
    text = text.replace(/\s+/g, &apos; &apos;).trim();
    
    return text;
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
        return match[0].replace(/\s+/g, &apos; &apos;).trim();
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
      &apos;security&apos;: [&apos;sécurité&apos;, &apos;vulnerability&apos;, &apos;vulnérabilité&apos;, &apos;patch&apos;, &apos;exploit&apos;],
      &apos;server&apos;: [&apos;server&apos;, &apos;serveur&apos;, &apos;datacenter&apos;, &apos;enterprise&apos;],
      &apos;update&apos;: [&apos;update&apos;, &apos;mise à jour&apos;, &apos;upgrade&apos;, &apos;installation&apos;],
      &apos;feature&apos;: [&apos;feature&apos;, &apos;fonctionnalité&apos;, &apos;nouveau&apos;, &apos;amélioration&apos;],
      &apos;bug&apos;: [&apos;bug&apos;, &apos;fix&apos;, &apos;correction&apos;, &apos;résolution&apos;, &apos;problème&apos;]
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
    
    // Keywords Windows/Windows Server prioritaires (BTS SIO SISR focus)
    const windowsKeywords = [
      &apos;windows server&apos;, &apos;windows 11&apos;, &apos;windows 10&apos;, &apos;windows&apos;, 
      &apos;server 2025&apos;, &apos;server 2022&apos;, &apos;server 2019&apos;, &apos;active directory&apos;, 
      &apos;hyper-v&apos;, &apos;iis&apos;, &apos;dns&apos;, &apos;dhcp&apos;, &apos;group policy&apos;, &apos;gpo&apos;
    ];
    
    // Keywords infrastructure et systèmes (domaine BTS SIO)
    const infraKeywords = [
      &apos;infrastructure&apos;, &apos;datacenter&apos;, &apos;enterprise&apos;, &apos;admin&apos;, &apos;administration&apos;,
      &apos;deployment&apos;, &apos;migration&apos;, &apos;backup&apos;, &apos;recovery&apos;, &apos;clustering&apos;,
      &apos;virtualization&apos;, &apos;network&apos;, &apos;security&apos;, &apos;patch&apos;, &apos;update&apos;, &apos;hotfix&apos;
    ];
    
    // Keywords techniques Windows Server
    const serverTechKeywords = [
      &apos;powershell&apos;, &apos;sql server&apos;, &apos;exchange&apos;, &apos;sharepoint&apos;, &apos;system center&apos;,
      &apos;wsus&apos;, &apos;rds&apos;, &apos;terminal services&apos;, &apos;failover cluster&apos;, &apos;storage spaces&apos;
    ];
    
    // Vérifier présence keywords Windows (priorité haute)
    const hasWindowsKeyword = windowsKeywords.some(keyword => text.includes(keyword));
    
    // Vérifier infrastructure + technique (pour les articles Microsoft généraux)
    const hasInfraKeyword = infraKeywords.some(keyword => text.includes(keyword));
    const hasTechKeyword = serverTechKeywords.some(keyword => text.includes(keyword));
    
    // Exclure les articles non pertinents pour BTS SIO SISR
    const excludeKeywords = [
      &apos;xbox&apos;, &apos;surface&apos;, &apos;hololens&apos;, &apos;microsoft teams&apos;, &apos;office 365&apos;, 
      &apos;onedrive&apos;, &apos;outlook.com&apos;, &apos;skype&apos;, &apos;bing&apos;, &apos;cortana&apos;, &apos;edge browser&apos;
    ];
    const hasExcludeKeyword = excludeKeywords.some(keyword => text.includes(keyword));
    
    // Logique de filtrage pour BTS SIO SISR
    if (hasExcludeKeyword) return false;
    if (hasWindowsKeyword) return true;
    if (hasInfraKeyword && hasTechKeyword) return true;
    
    return false;
  }

  translateSimple(text) {
    if (!text) return text;

    // Improved translation with better context handling
    const translations = {
      // Phrases complètes d&apos;abord (ordre important)
      &apos;tired of all the restarts? get hotpatching for windows server&apos;: &apos;fatigué de tous les redémarrages ? obtenez les correctifs à chaud pour Windows Server&apos;,
      &apos;join us at windows server summit&apos;: &apos;rejoignez-nous au Windows Server Summit&apos;,
      &apos;learn more about our latest innovations&apos;: &apos;en savoir plus sur nos dernières innovations&apos;,
      &apos;now generally available with advanced security&apos;: &apos;maintenant généralement disponible avec une sécurité avancée&apos;,
      &apos;enhanced security and performance&apos;: &apos;sécurité et performances améliorées&apos;,
      &apos;improved performance and cloud agility&apos;: &apos;performances améliorées et agilité cloud&apos;,
      &apos;subscription service&apos;: &apos;service par abonnement&apos;,
      &apos;infrastructure management&apos;: &apos;gestion d\&apos;infrastructure&apos;,
      &apos;cloud capabilities&apos;: &apos;capacités cloud&apos;,
      &apos;efficient it operations&apos;: &apos;opérations IT efficaces&apos;,
      &apos;we are excited to announce&apos;: &apos;nous avons le plaisir d\&apos;annoncer&apos;,
      &apos;we are pleased to announce&apos;: &apos;nous sommes heureux d\&apos;annoncer&apos;,
      &apos;appeared first on&apos;: &apos;est paru en premier sur&apos;,
      &apos;the post&apos;: &apos;l\&apos;article&apos;,
      &apos;this post&apos;: &apos;cet article&apos;,
      
      // Technical terms
      &apos;hotpatching&apos;: &apos;correctifs à chaud&apos;,
      &apos;patching&apos;: &apos;application de correctifs&apos;,
      &apos;restarts&apos;: &apos;redémarrages&apos;,
      &apos;reboot&apos;: &apos;redémarrage&apos;,
      &apos;windows server&apos;: &apos;Windows Server&apos;,
      &apos;server&apos;: &apos;serveur&apos;,
      &apos;security&apos;: &apos;sécurité&apos;,
      &apos;update&apos;: &apos;mise à jour&apos;,
      &apos;updates&apos;: &apos;mises à jour&apos;,
      &apos;patch&apos;: &apos;correctif&apos;,
      &apos;patches&apos;: &apos;correctifs&apos;,
      &apos;vulnerability&apos;: &apos;vulnérabilité&apos;,
      &apos;vulnerabilities&apos;: &apos;vulnérabilités&apos;,
      &apos;feature&apos;: &apos;fonctionnalité&apos;,
      &apos;features&apos;: &apos;fonctionnalités&apos;,
      &apos;new features&apos;: &apos;nouvelles fonctionnalités&apos;,
      &apos;performance&apos;: &apos;performances&apos;,
      &apos;improvements&apos;: &apos;améliorations&apos;,
      &apos;enhancement&apos;: &apos;amélioration&apos;,
      &apos;enhancements&apos;: &apos;améliorations&apos;,
      &apos;release&apos;: &apos;version&apos;,
      &apos;preview&apos;: &apos;aperçu&apos;,
      &apos;available&apos;: &apos;disponible&apos;,
      &apos;now available&apos;: &apos;maintenant disponible&apos;,
      &apos;generally available&apos;: &apos;généralement disponible&apos;,
      &apos;public preview&apos;: &apos;aperçu public&apos;,
      &apos;enterprise&apos;: &apos;entreprise&apos;,
      &apos;cloud&apos;: &apos;cloud&apos;,
      &apos;datacenter&apos;: &apos;centre de données&apos;,
      &apos;support&apos;: &apos;prise en charge&apos;,
      &apos;management&apos;: &apos;gestion&apos;,
      &apos;administration&apos;: &apos;administration&apos;,
      &apos;deployment&apos;: &apos;déploiement&apos;,
      &apos;configuration&apos;: &apos;configuration&apos;,
      &apos;installation&apos;: &apos;installation&apos;,
      &apos;upgrade&apos;: &apos;mise à niveau&apos;,
      &apos;migration&apos;: &apos;migration&apos;,
      
      // Time expressions
      &apos;and&apos;: &apos;et&apos;,
      &apos;with&apos;: &apos;avec&apos;,
      &apos;for&apos;: &apos;pour&apos;,
      &apos;from&apos;: &apos;de&apos;,
      &apos;to&apos;: &apos;vers&apos;,
      &apos;in&apos;: &apos;dans&apos;,
      &apos;on&apos;: &apos;sur&apos;,
      &apos;at&apos;: &apos;à&apos;
    };
    
    let translatedText = text;
    
    // Apply translations in order of length (longest phrases first)
    const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
    
    for (const [english, french] of sortedTranslations) {
      // Use case-insensitive replacement with word boundaries when appropriate
      const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, &apos;\\$&&apos;)}\\b`, &apos;gi&apos;);
      translatedText = translatedText.replace(regex, french);
    }
    
    return translatedText;
  }

  isFrenchContent(text) {
    const frenchIndicators = [
      &apos;de la&apos;, &apos;de le&apos;, &apos;du &apos;, &apos;des &apos;, &apos;le &apos;, &apos;la &apos;, &apos;les &apos;,
      &apos;mise à jour&apos;, &apos;sécurité&apos;, &apos;disponible&apos;, &apos;nouveau&apos;,
      &apos;nouvelle&apos;, &apos;fonctionnalité&apos;, &apos;amélioration&apos;, &apos;article&apos;,
      &apos;Microsoft France&apos;, &apos;en français&apos;
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
        
        // Délai configurable entre les requêtes
        const delay = parseInt(process.env.NEXT_PUBLIC_RSS_REQUEST_DELAY) || 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        logger.error(`❌ Erreur source ${sourceKey}:`, error);
        continue;
      }
    }
    
    // Sort by publication date (newest first)
    allUpdates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    
    logger.rss(`🎯 Total mises à jour récupérées : ${allUpdates.length}`);
    return allUpdates;
  }
}

export const rssFetcher = new WindowsRSSFetcher();