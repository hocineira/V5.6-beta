import { NextResponse } from &apos;next/server&apos;;
import { starlinkRssFetcher } from &apos;../../../../../lib/starlink-rss-fetcher.js&apos;;
import { starlinkStorage } from &apos;../../../../../lib/starlink-storage.js&apos;;

export async function POST(request) {
  try {
    console.log(&apos;🛰️ API Starlink: démarrage refresh RSS&apos;);

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
        status: &apos;success&apos;
      });
    } else {
      console.log(&apos;⚠️ Aucune actualité Starlink récupérée lors du refresh&apos;);
      
      return NextResponse.json({
        success: false,
        message: &apos;Aucune actualité Starlink trouvée lors du refresh&apos;,
        count: 0,
        status: &apos;warning&apos;
      });
    }
  } catch (error) {
    console.error(&apos;❌ Erreur refresh RSS Starlink:&apos;, error);
    
    return NextResponse.json(
      { 
        success: false,
        error: &apos;Erreur lors du refresh RSS Starlink&apos;,
        details: error.message,
        status: &apos;error&apos;
      },
      { status: 500 }
    );
  }
}