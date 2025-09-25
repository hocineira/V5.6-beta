import { NextResponse } from 'next/server';
import { starlinkRssFetcher } from '../../../../../lib/starlink-rss-fetcher.js';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';

export async function POST(request) {
  try {
    console.log('🛰️ API Starlink: démarrage refresh RSS');

    // Fetch all RSS feeds
    const updates = await starlinkRssFetcher.fetchAllFeeds();
    
    if (updates && updates.length > 0) {
      // Save to storage
      await starlinkStorage.saveStarlinkUpdates(updates);
      
      console.log(`✅ Refresh Starlink terminé: ${updates.length} actualités traitées`);
      
      return NextResponse.json({
        success: true,
        message: `${updates.length} actualités Starlink récupérées et sauvegardées`,
        count: updates.length,
        status: 'success'
      });
    } else {
      console.log('⚠️ Aucune actualité Starlink récupérée lors du refresh');
      
      return NextResponse.json({
        success: false,
        message: 'Aucune actualité Starlink trouvée lors du refresh',
        count: 0,
        status: 'warning'
      });
    }
  } catch (error) {
    console.error('❌ Erreur refresh RSS Starlink:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors du refresh RSS Starlink',
        details: error.message,
        status: 'error'
      },
      { status: 500 }
    );
  }
}