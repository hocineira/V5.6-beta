import { NextResponse } from &apos;next/server&apos;;
import { storage } from &apos;../../../../../lib/storage.js&apos;;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get(&apos;limit&apos;) || &apos;10&apos;);

    const updates = await storage.getLatestUpdates(limit);

    // Convert dates to strings for JSON response
    const formattedUpdates = updates.map(update => ({
      ...update,
      published_date: update.published_date.toISOString(),
      created_at: update.created_at.toISOString(),
      updated_at: update.updated_at.toISOString()
    }));

    return NextResponse.json({
      updates: formattedUpdates,
      count: formattedUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(&apos;Erreur récupération latest updates:&apos;, error);
    return NextResponse.json(
      { error: &apos;Erreur récupération des dernières mises à jour&apos; },
      { status: 500 }
    );
  }
}