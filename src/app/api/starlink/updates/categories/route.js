import { NextResponse } from &apos;next/server&apos;;
import { starlinkStorage } from &apos;../../../../../lib/starlink-storage.js&apos;;

export async function GET(request) {
  try {
    console.log(&apos;🛰️ API Starlink: récupération categories&apos;);

    const categories = await starlinkStorage.getStarlinkCategories();

    const response = {
      categories,
      count: categories.length,
      status: &apos;success&apos;
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(&apos;❌ Erreur API Starlink categories:&apos;, error);
    
    return NextResponse.json(
      { 
        error: &apos;Erreur lors de la récupération des catégories Starlink&apos;,
        details: error.message,
        status: &apos;error&apos;
      },
      { status: 500 }
    );
  }
}