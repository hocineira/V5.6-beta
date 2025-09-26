import { NextResponse } from &apos;next/server&apos;;
import { starlinkStorage } from &apos;../../../../lib/starlink-storage.js&apos;;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get(&apos;category&apos;) || &apos;all&apos;;
    const limit = parseInt(searchParams.get(&apos;limit&apos;)) || 20;

    console.log(`🛰️ API Starlink: récupération updates - category: ${category}, limit: ${limit}`);

    const updates = await starlinkStorage.getStarlinkUpdatesByCategory(category, limit);
    const stats = await starlinkStorage.getStarlinkStats();

    const response = {
      updates,
      total: stats.total,
      category: category,
      limit: limit,
      categories: stats.categories,
      lastUpdated: stats.lastUpdated,
      status: &apos;success&apos;
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(&apos;❌ Erreur API Starlink updates:&apos;, error);
    
    return NextResponse.json(
      { 
        error: &apos;Erreur lors de la récupération des actualités Starlink&apos;,
        details: error.message,
        status: &apos;error&apos;
      },
      { status: 500 }
    );
  }
}