import { NextResponse } from &apos;next/server&apos;;
import { storage } from &apos;../../../../lib/storage.js&apos;;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get(&apos;category&apos;);
    const limit = parseInt(searchParams.get(&apos;limit&apos;) || &apos;50&apos;);
    const version = searchParams.get(&apos;version&apos;);

    // Get updates from storage
    let updates = await storage.getWindowsUpdates(category, limit);

    // Filter by version if specified
    if (version) {
      updates = updates.filter(update => 
        update.version && version.toLowerCase().includes(update.version.toLowerCase())
      );
    }

    // Convert dates to strings for JSON response
    const formattedUpdates = updates.map(update => ({
      ...update,
      published_date: update.published_date.toISOString(),
      created_at: update.created_at.toISOString(),
      updated_at: update.updated_at.toISOString()
    }));

    return NextResponse.json({
      total: formattedUpdates.length,
      updates: formattedUpdates,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error(&apos;Erreur récupération updates:&apos;, error);
    return NextResponse.json(
      { error: &apos;Erreur récupération des mises à jour&apos; },
      { status: 500 }
    );
  }
}