import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../lib/starlink-storage.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit')) || 20;

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
      status: 'success'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Erreur API Starlink updates:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des actualités Starlink',
        details: error.message,
        status: 'error'
      },
      { status: 500 }
    );
  }
}