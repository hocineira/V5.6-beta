import { NextResponse } from &apos;next/server&apos;;
import { starlinkStorage } from &apos;../../../../../lib/starlink-storage.js&apos;;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get(&apos;limit&apos;)) || 5;

    console.log(`🛰️ API Starlink: récupération dernières updates - limit: ${limit}`);

    const updates = await starlinkStorage.getLatestStarlinkUpdates(limit);

    const response = {
      updates,
      count: updates.length,
      limit: limit,
      status: &apos;success&apos;
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(&apos;❌ Erreur API Starlink latest:&apos;, error);
    
    return NextResponse.json(
      { 
        error: &apos;Erreur lors de la récupération des dernières actualités Starlink&apos;,
        details: error.message,
        status: &apos;error&apos;
      },
      { status: 500 }
    );
  }
}