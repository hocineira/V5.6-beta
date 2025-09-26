import { NextResponse } from &apos;next/server&apos;
import fs from &apos;fs&apos;
import path from &apos;path&apos;

export async function GET(request, { params }) {
  try {
    const filename = params.filename
    const filePath = path.join(process.cwd(), &apos;public&apos;, &apos;procedures&apos;, filename)
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: &apos;PDF not found&apos; }, { status: 404 })
    }
    
    // Lire le fichier PDF
    const fileBuffer = fs.readFileSync(filePath)
    
    // Créer une réponse avec les bons en-têtes
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        &apos;Content-Type&apos;: &apos;application/pdf&apos;,
        &apos;Content-Disposition&apos;: `inline; filename="${filename}"`,
        &apos;Cache-Control&apos;: &apos;public, max-age=3600&apos;
      }
    })
    
    return response
  } catch (error) {
    console.error(&apos;Error serving PDF:&apos;, error)
    return NextResponse.json({ error: &apos;Internal server error&apos; }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      &apos;Cache-Control&apos;: &apos;public, max-age=3600&apos;
    }
  })
}