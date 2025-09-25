import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';

export async function GET(request) {
  try {
    console.log('🛰️ API Starlink: récupération stats');

    const stats = await starlinkStorage.getStarlinkStats();

    const response = {
      ...stats,
      status: 'success'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Erreur API Starlink stats:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des statistiques Starlink',
        details: error.message,
        status: 'error'
      },
      { status: 500 }
    );
  }
}