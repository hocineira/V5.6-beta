'use client'

import { useState } from 'react'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { 
  ArrowLeft, BookOpen, FileText, Download, 
  ZoomIn, ZoomOut, Eye, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function ProjetsE6() {
  const [pdfUrl, setPdfUrl] = useState('/documents/dossier-e6.pdf') // Chemin vers le PDF à ajouter plus tard
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/projets" 
              className="inline-flex items-center text-white hover:text-white/80 transition-colors duration-200 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Link>
          </div>

          <div className="text-center">
            {/* Badge E6 */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-8 shadow-lg">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-sm text-white font-semibold">Épreuve E6 - BTS SIO SISR</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
              <span className="block mb-2">
                RÉALISATION 1 ET 2
              </span>
              <span className="block text-white/90">
                DOSSIER E6
              </span>
            </h1>

            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h2 className="text-2xl font-bold text-white mb-4">À propos de ce dossier</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      Ce document constitue mon dossier officiel soumis sur la plateforme Cyclade dans le cadre de l'épreuve E6. 
                      Il présente deux réalisations complètes de solutions d'infrastructure réseau déployées sur le plot S4P2 de l'établissement IFC Marseille.
                    </p>
                    <p className="text-white/90 leading-relaxed text-lg mt-4">
                      Chaque réalisation est documentée de manière exhaustive avec des captures d'écran de l'infrastructure réelle, 
                      détaillant les configurations techniques mises en œuvre ainsi que les procédures de tests et de validation du déploiement.
                    </p>
                  </div>
                </div>

                {/* Points clés */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">Infrastructure réelle</span>
                  </div>
                  <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">Captures d'écran détaillées</span>
                  </div>
                  <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">Tests de déploiement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-green-400/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Controls */}
          <div className="bg-slate-900/80 border-b border-green-400/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Visualisation du dossier</span>
                <Badge className="bg-green-500/20 text-green-300 border border-green-400/30">
                  PDF
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom controls */}
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleZoomOut}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-300 px-2 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleZoomIn}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>

                {/* Download button */}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  onClick={() => window.open(pdfUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="bg-slate-900/50 p-8">
            <div 
              className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
              style={{ 
                width: `${zoom}%`,
                maxWidth: '100%',
                transition: 'width 0.3s ease'
              }}
            >
              {/* Placeholder for PDF - will be replaced when PDF is added */}
              <div className="aspect-[1/1.414] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg mb-6">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    Dossier E6 à venir
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                    Le fichier PDF du dossier sera ajouté prochainement. 
                    Pour l'intégrer, placez votre PDF dans <code className="bg-slate-300 px-2 py-1 rounded text-sm">/public/documents/dossier-e6.pdf</code>
                  </p>
                  
                  {/* Uncomment this when PDF is ready */}
                  {/* <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title="Dossier E6"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/40 px-6 py-3 rounded-full border border-slate-700/50">
            <FileText className="w-4 h-4" />
            <span className="text-sm">
              Pour ajouter votre PDF : placez-le dans <span className="text-green-400 font-mono">/public/documents/dossier-e6.pdf</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}