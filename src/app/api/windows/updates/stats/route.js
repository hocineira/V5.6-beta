import { NextResponse } from &apos;next/server&apos;;
import { storage } from &apos;../../../../../lib/storage.js&apos;;

export async function GET() {
  try {
    const stats = await storage.getUpdateStats();

    return NextResponse.json({
      total: stats.total,
      by_category: stats.by_category,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error(&apos;Erreur récupération stats:&apos;, error);
    return NextResponse.json(
      { error: &apos;Erreur récupération des statistiques&apos; },
      { status: 500 }
    );
  }
}