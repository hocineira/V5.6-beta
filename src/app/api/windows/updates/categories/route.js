import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = [
      {
        key: "security",
        name: "Sécurité",
        description: "Mises à jour de sécurité et correctifs"
      },
      {
        key: "feature", 
        name: "Fonctionnalités",
        description: "Nouvelles fonctionnalités et améliorations"
      },
      {
        key: "server",
        name: "Windows Server", 
        description: "Spécifique à Windows Server"
      },
      {
        key: "general",
        name: "Général",
        description: "Mises à jour générales"
      }
    ];

    return NextResponse.json({
      categories
    });

  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des catégories' },
      { status: 500 }
    );
  }
}