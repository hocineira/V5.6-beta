import { promises as fs } from &apos;fs&apos;;
import path from &apos;path&apos;;

class StarlinkStorage {
  constructor() {
    this.dataDir = path.join(process.cwd(), &apos;data&apos;);
    this.starlinkCacheFile = path.join(this.dataDir, &apos;starlink-cache.json&apos;);
  }

  async ensureDataDir() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  async saveStarlinkUpdates(updates) {
    try {
      await this.ensureDataDir();
      
      const data = {
        updates,
        lastUpdated: new Date().toISOString(),
        total: updates.length
      };
      
      await fs.writeFile(this.starlinkCacheFile, JSON.stringify(data, null, 2));
      console.log(`✅ ${updates.length} actualités Starlink sauvegardées`);
      
      return data;
    } catch (error) {
      console.error(&apos;❌ Erreur sauvegarde Starlink:&apos;, error);
      throw error;
    }
  }

  async loadStarlinkUpdates() {
    try {
      await this.ensureDataDir();
      
      const fileContent = await fs.readFile(this.starlinkCacheFile, &apos;utf-8&apos;);
      const data = JSON.parse(fileContent);
      
      console.log(`📖 ${data.total || 0} actualités Starlink chargées du cache`);
      
      return {
        updates: data.updates || [],
        total: data.total || 0,
        lastUpdated: data.lastUpdated
      };
    } catch (error) {
      if (error.code === &apos;ENOENT&apos;) {
        console.log(&apos;📝 Aucun cache Starlink trouvé, retour données vides&apos;);
        return { updates: [], total: 0, lastUpdated: null };
      }
      
      console.error(&apos;❌ Erreur chargement cache Starlink:&apos;, error);
      throw error;
    }
  }

  async getStarlinkStats() {
    const data = await this.loadStarlinkUpdates();
    
    const stats = {
      total: data.total || 0,
      lastUpdated: data.lastUpdated,
      categories: {}
    };

    // Count by categories
    if (data.updates) {
      data.updates.forEach(update => {
        const category = update.category || &apos;unknown&apos;;
        stats.categories[category] = (stats.categories[category] || 0) + 1;
      });
    }

    return stats;
  }

  async getStarlinkCategories() {
    const data = await this.loadStarlinkUpdates();
    const categories = new Set();
    
    if (data.updates) {
      data.updates.forEach(update => {
        if (update.category) {
          categories.add(update.category);
        }
      });
    }
    
    return Array.from(categories);
  }

  async getLatestStarlinkUpdates(limit = 10) {
    const data = await this.loadStarlinkUpdates();
    
    if (!data.updates || data.updates.length === 0) {
      return [];
    }
    
    // Sort by publication date (newest first) and limit
    const sortedUpdates = data.updates
      .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
      .slice(0, limit);
    
    return sortedUpdates;
  }

  async getStarlinkUpdatesByCategory(category, limit = 20) {
    const data = await this.loadStarlinkUpdates();
    
    if (!data.updates || data.updates.length === 0) {
      return [];
    }
    
    const filtered = data.updates.filter(update => 
      category === &apos;all&apos; || update.category === category
    );
    
    // Sort by publication date (newest first) and limit
    const sortedUpdates = filtered
      .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
      .slice(0, limit);
    
    return sortedUpdates;
  }
}

export const starlinkStorage = new StarlinkStorage();