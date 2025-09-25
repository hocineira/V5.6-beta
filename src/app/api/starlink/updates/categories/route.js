import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';

export async function GET(request) {
  try {
    console.log('🛰️ API Starlink: récupération categories');

    const categories = await starlinkStorage.getStarlinkCategories();

    const response = {
      categories,
      count: categories.length,
      status: 'success'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Erreur API Starlink categories:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des catégories Starlink',
        details: error.message,
        status: 'error'
      },
      { status: 500 }
    );
  }
}