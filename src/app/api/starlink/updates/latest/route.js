import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 5;

    console.log(`🛰️ API Starlink: récupération dernières updates - limit: ${limit}`);

    const updates = await starlinkStorage.getLatestStarlinkUpdates(limit);

    const response = {
      updates,
      count: updates.length,
      limit: limit,
      status: 'success'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Erreur API Starlink latest:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des dernières actualités Starlink',
        details: error.message,
        status: 'error'
      },
      { status: 500 }
    );
  }
}