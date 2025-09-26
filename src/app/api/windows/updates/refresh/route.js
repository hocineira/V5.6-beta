import { NextResponse } from &apos;next/server&apos;;
import { rssFetcher } from &apos;../../../../../lib/rss-fetcher.js&apos;;
import { storage } from &apos;../../../../../lib/storage.js&apos;;
import { logger } from &apos;../../../../../lib/logger.js&apos;;

export async function POST() {
  try {
    logger.info(&apos;🚀 Démarrage mise à jour RSS manuelle...&apos;);
    
    // Fetch all RSS feeds
    const allUpdates = await rssFetcher.fetchAllFeeds();
    
    // Store updates in database
    let storedCount = 0;
    for (const updateData of allUpdates) {
      try {
        await storage.saveWindowsUpdate(updateData);
        storedCount++;
      } catch (error) {
        console.error(&apos;Erreur stockage update:&apos;, error);
        continue;
      }
    }
    
    console.log(`✅ ${storedCount} mises à jour stockées sur ${allUpdates.length} récupérées`);
    
    return NextResponse.json({
      message: &apos;Mise à jour des flux RSS terminée&apos;,
      stored: storedCount,
      total: allUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(&apos;❌ Erreur refresh RSS:&apos;, error);
    return NextResponse.json(
      { 
        error: &apos;Erreur lors de la mise à jour des flux RSS&apos;,
        details: error.message
      },
      { status: 500 }
    );
  }
}