// Service RSS pour récupérer et traiter les flux Starlink/SpaceX
import { formatDistanceToNow } from &apos;date-fns&apos;;
import { fr } from &apos;date-fns/locale&apos;;

class StarlinkRSSFetcher {
  constructor() {
    this.sources = {
      spacenews_spacex: {
        url: "https://spacenews.com/tag/spacex/feed",
        name: "SpaceNews - SpaceX",
        category: "spacex",
        language: "en"
      },
      teslarati_spacex: {
        url: "https://teslarati.com/category/spacex/feed",
        name: "Teslarati - SpaceX",
        category: "spacex",
        language: "en"
      },
      space_news: {
        url: "https://space.com/feeds.xml",
        name: "Space.com",
        category: "space",
        language: "en"
      },
      space_news_articles: {
        url: "https://space.com/feeds/articletype/news.xml",
        name: "Space.com News",
        category: "space",
        language: "en"
      }
    };
  }

  async fetchFeed(sourceKey) {
    try {
      const source = this.sources[sourceKey];
      if (!source) return [];

      console.log(`🛰️ Récupération du feed Starlink : ${source.name}`);

      const response = await fetch(source.url, {
        headers: {
          &apos;User-Agent&apos;: &apos;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36&apos;
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML manually for better control
      const updates = this.parseRSSFeed(xmlText, source);
      
      console.log(`✅ ${updates.length} actualités Starlink récupérées de ${source.name}`);
      return updates;

    } catch (error) {
      console.error(`❌ Erreur récupération feed Starlink ${sourceKey}:`, error);
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
        if (item && this.isRelevantForStarlink(item)) {
          items.push(item);
        }
      }

      return items.slice(0, 15); // Limit to 15 recent entries
    } catch (error) {
      console.error(&apos;Erreur parsing RSS Starlink:&apos;, error);
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

      // Translation if needed (Starlink content in French)
      let finalTitle = title;
      let finalDescription = description.substring(0, 800);

      if (source.language === "en") {
        if (!this.isFrenchContent(title + " " + description)) {
          finalTitle = this.translateToFrench(title);
          if (description.length > 50) {
            finalDescription = this.translateToFrench(description.substring(0, 400));
          }
        }
      }

      // Extract mission information
      const mission = this.extractMissionInfo(title + " " + description);
      
      // Extract satellite count
      const satelliteCount = this.extractSatelliteCount(title + " " + description);
      
      // Generate tags
      const tags = this.generateStarlinkTags(title, description, source.category);

      return {
        id: this.generateId(title, link),
        title: finalTitle,
        description: finalDescription,
        link: link,
        published_date: publishedDate.toISOString(),
        category: source.category,
        mission: mission,
        satellite_count: satelliteCount,
        tags: tags,
        source: source.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

    } catch (error) {
      console.error(&apos;Erreur parsing item RSS Starlink:&apos;, error);
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

  extractMissionInfo(text) {
    const textLower = text.toLowerCase();
    
    // Mission patterns
    const patterns = [
      /starlink\s+(\d+[-\d]*)/i,
      /falcon\s+9\s+starlink/i,
      /starlink\s+mission/i,
      /starlink\s+launch/i,
      /group\s+(\d+[-\d]*)/i
    ];
    
    for (const pattern of patterns) {
      const match = textLower.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  extractSatelliteCount(text) {
    const patterns = [
      /(\d+)\s+satellites/i,
      /(\d+)\s+starlink\s+satellites/i,
      /launching\s+(\d+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }
    
    return null;
  }

  generateStarlinkTags(title, description, category) {
    const text = (title + " " + description).toLowerCase();
    const tags = [];
    
    // Starlink/SpaceX keywords
    const spaceKeywords = {
      &apos;starlink&apos;: [&apos;starlink&apos;, &apos;constellation&apos;],
      &apos;falcon&apos;: [&apos;falcon 9&apos;, &apos;falcon heavy&apos;, &apos;booster&apos;, &apos;landing&apos;],
      &apos;launch&apos;: [&apos;launch&apos;, &apos;lancement&apos;, &apos;décollage&apos;, &apos;mission&apos;],
      &apos;satellite&apos;: [&apos;satellite&apos;, &apos;satellites&apos;, &apos;v2&apos;, &apos;gen2&apos;],
      &apos;spacex&apos;: [&apos;spacex&apos;, &apos;elon musk&apos;],
      &apos;dragon&apos;: [&apos;dragon&apos;, &apos;crew dragon&apos;, &apos;cargo&apos;],
      &apos;mars&apos;: [&apos;mars&apos;, &apos;starship&apos;, &apos;raptor&apos;]
    };
    
    for (const [tag, keywords] of Object.entries(spaceKeywords)) {
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

  isRelevantForStarlink(update) {
    const text = (update.title + " " + update.description).toLowerCase();
    
    // Keywords Starlink prioritaires
    const starlinkKeywords = [
      &apos;starlink&apos;, &apos;spacex&apos;, &apos;elon musk&apos;, &apos;falcon 9&apos;, &apos;falcon heavy&apos;, 
      &apos;satellite internet&apos;, &apos;constellation&apos;, &apos;starship&apos;
    ];
    
    // Keywords espace et lanceurs
    const spaceKeywords = [
      &apos;satellite&apos;, &apos;satellites&apos;, &apos;launch&apos;, &apos;lancement&apos;, &apos;mission&apos;, &apos;orbit&apos;,
      &apos;iss&apos;, &apos;dragon&apos;, &apos;crew&apos;, &apos;cargo&apos;, &apos;booster&apos;, &apos;landing&apos;, &apos;recovery&apos;
    ];
    
    // Keywords innovations spatiales
    const innovationKeywords = [
      &apos;internet from space&apos;, &apos;global broadband&apos;, &apos;low earth orbit&apos;, &apos;leo&apos;,
      &apos;mars&apos;, &apos;moon&apos;, &apos;space exploration&apos;, &apos;raptor&apos;, &apos;merlin&apos;
    ];
    
    // Vérifier présence keywords Starlink/SpaceX (priorité haute)
    const hasStarlinkKeyword = starlinkKeywords.some(keyword => text.includes(keyword));
    
    // Vérifier espace + innovation
    const hasSpaceKeyword = spaceKeywords.some(keyword => text.includes(keyword));
    const hasInnovationKeyword = innovationKeywords.some(keyword => text.includes(keyword));
    
    // Exclure articles non pertinents
    const excludeKeywords = [
      &apos;tesla model&apos;, &apos;cybertruck&apos;, &apos;twitter&apos;, &apos;x.com&apos;, &apos;neuralink&apos;,
      &apos;boring company&apos;, &apos;hyperloop&apos;, &apos;bitcoin&apos;
    ];
    const hasExcludeKeyword = excludeKeywords.some(keyword => text.includes(keyword));
    
    // Logique de filtrage Starlink
    if (hasExcludeKeyword) return false;
    if (hasStarlinkKeyword) return true;
    if (hasSpaceKeyword && hasInnovationKeyword) return true;
    
    return false;
  }

  translateToFrench(text) {
    if (!text) return text;

    // Improved French translation for space/Starlink content
    const translations = {
      // Phrases complètes Starlink
      &apos;starlink satellites launched successfully&apos;: &apos;satellites Starlink lancés avec succès&apos;,
      &apos;spacex launches starlink mission&apos;: &apos;SpaceX lance une mission Starlink&apos;,
      &apos;falcon 9 rocket launches&apos;: &apos;la fusée Falcon 9 décolle&apos;,
      &apos;successful satellite deployment&apos;: &apos;déploiement de satellites réussi&apos;,
      &apos;internet constellation expansion&apos;: &apos;expansion de la constellation internet&apos;,
      &apos;global internet coverage&apos;: &apos;couverture internet mondiale&apos;,
      &apos;low earth orbit satellites&apos;: &apos;satellites en orbite basse terrestre&apos;,
      &apos;space exploration milestone&apos;: &apos;étape de l\&apos;exploration spatiale&apos;,
      &apos;rocket landing successful&apos;: &apos;atterrissage de fusée réussi&apos;,
      &apos;crew dragon mission&apos;: &apos;mission Crew Dragon&apos;,
      &apos;international space station&apos;: &apos;station spatiale internationale&apos;,
      
      // Technical Starlink terms
      &apos;starlink&apos;: &apos;Starlink&apos;,
      &apos;spacex&apos;: &apos;SpaceX&apos;,
      &apos;falcon 9&apos;: &apos;Falcon 9&apos;,
      &apos;falcon heavy&apos;: &apos;Falcon Heavy&apos;,
      &apos;starship&apos;: &apos;Starship&apos;,
      &apos;dragon&apos;: &apos;Dragon&apos;,
      &apos;crew dragon&apos;: &apos;Crew Dragon&apos;,
      &apos;cargo dragon&apos;: &apos;Cargo Dragon&apos;,
      &apos;satellites&apos;: &apos;satellites&apos;,
      &apos;satellite&apos;: &apos;satellite&apos;,
      &apos;constellation&apos;: &apos;constellation&apos;,
      &apos;internet service&apos;: &apos;service internet&apos;,
      &apos;broadband&apos;: &apos;haut débit&apos;,
      &apos;launch&apos;: &apos;lancement&apos;,
      &apos;launched&apos;: &apos;lancé&apos;,
      &apos;launches&apos;: &apos;lance&apos;,
      &apos;launching&apos;: &apos;lancement&apos;,
      &apos;mission&apos;: &apos;mission&apos;,
      &apos;orbit&apos;: &apos;orbite&apos;,
      &apos;orbital&apos;: &apos;orbital&apos;,
      &apos;deployment&apos;: &apos;déploiement&apos;,
      &apos;booster&apos;: &apos;propulseur&apos;,
      &apos;landing&apos;: &apos;atterrissage&apos;,
      &apos;recovery&apos;: &apos;récupération&apos;,
      &apos;successful&apos;: &apos;réussi&apos;,
      &apos;milestone&apos;: &apos;étape importante&apos;,
      &apos;expansion&apos;: &apos;expansion&apos;,
      &apos;coverage&apos;: &apos;couverture&apos;,
      &apos;global&apos;: &apos;mondiale&apos;,
      &apos;space&apos;: &apos;espace&apos;,
      &apos;rocket&apos;: &apos;fusée&apos;,
      &apos;spacecraft&apos;: &apos;vaisseau spatial&apos;,
      
      // Common space terms
      &apos;and&apos;: &apos;et&apos;,
      &apos;with&apos;: &apos;avec&apos;,
      &apos;for&apos;: &apos;pour&apos;,
      &apos;from&apos;: &apos;de&apos;,
      &apos;to&apos;: &apos;vers&apos;,
      &apos;in&apos;: &apos;dans&apos;,
      &apos;on&apos;: &apos;sur&apos;,
      &apos;at&apos;: &apos;à&apos;,
      &apos;the&apos;: &apos;le/la&apos;,
      &apos;new&apos;: &apos;nouveau&apos;,
      &apos;latest&apos;: &apos;dernier&apos;,
      &apos;first&apos;: &apos;premier&apos;,
      &apos;next&apos;: &apos;prochain&apos;
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
      &apos;lancement&apos;, &apos;satellite&apos;, &apos;espace&apos;, &apos;mission&apos;, &apos;fusée&apos;,
      &apos;constellation&apos;, &apos;orbite&apos;, &apos;déploiement&apos;, &apos;SpaceX France&apos;
    ];
    
    const textLower = text.toLowerCase();
    const frenchCount = frenchIndicators.filter(indicator => 
      textLower.includes(indicator)
    ).length;
    
    return frenchCount >= 2;
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
        console.error(`❌ Erreur source Starlink ${sourceKey}:`, error);
        continue;
      }
    }
    
    // Sort by publication date (newest first)
    allUpdates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    
    console.log(`🛰️ Total actualités Starlink récupérées : ${allUpdates.length}`);
    return allUpdates;
  }
}

export const starlinkRssFetcher = new StarlinkRSSFetcher();