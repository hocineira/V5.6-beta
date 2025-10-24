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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Animated background blobs - couleurs professionnelles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-700/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/projets" 
              className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Link>
          </div>

          <div className="text-center">
            {/* Badge E6 */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 rounded-full mb-8 shadow-lg shadow-cyan-500/10">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-semibold">Épreuve E6 - BTS SIO SISR</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
              <span className="block mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                RÉALISATION 1 ET 2
              </span>
              <span className="block text-white">
                DOSSIER E6
              </span>
            </h1>

            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h2 className="text-2xl font-bold text-white mb-4">À propos de ce dossier</h2>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Ce document constitue mon dossier officiel soumis sur la plateforme Cyclade dans le cadre de l'épreuve E6. 
                      Il présente deux réalisations complètes de solutions d'infrastructure réseau déployées sur le plot S4P2 de l'établissement IFC Marseille.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mt-4">
                      Chaque réalisation est documentée de manière exhaustive avec des captures d'écran de l'infrastructure réelle, 
                      détaillant les configurations techniques mises en œuvre ainsi que les procédures de tests et de validation du déploiement.
                    </p>
                  </div>
                </div>

                {/* Points clés */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-cyan-300 bg-slate-700/30 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-600/40">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">Infrastructure réelle</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-300 bg-slate-700/30 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-600/40">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">Captures d'écran détaillées</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-300 bg-slate-700/30 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-600/40">
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
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Controls */}
          <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">Visualisation du dossier</span>
                <Badge className="bg-white/20 text-white border border-white/30 backdrop-blur-sm px-3 py-1">
                  PDF
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom controls */}
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/30">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleZoomOut}
                    className="text-white hover:text-white hover:bg-white/20 border-0"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </Button>
                  <span className="text-sm text-white font-semibold px-3 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleZoomIn}
                    className="text-white hover:text-white hover:bg-white/20 border-0"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </div>

                {/* Download button */}
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-semibold px-6 py-2"
                  onClick={() => window.open(pdfUrl, '_blank')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm">
            <div 
              className="mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30"
              style={{ 
                width: `${zoom}%`,
                maxWidth: '100%',
                transition: 'width 0.3s ease'
              }}
            >
              {/* Placeholder for PDF - will be replaced when PDF is added */}
              <div className="aspect-[1/1.414] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl mb-6 animate-pulse">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Dossier E6 à venir
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-lg">
                    Le fichier PDF du dossier sera ajouté prochainement. 
                    Pour l'intégrer, placez votre PDF dans <code className="bg-purple-100 px-3 py-1 rounded text-sm font-mono text-purple-700">/public/documents/dossier-e6.pdf</code>
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
          <div className="inline-flex items-center gap-3 text-white bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 shadow-lg">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">
              Pour ajouter votre PDF : placez-le dans <span className="font-mono font-bold">/public/documents/dossier-e6.pdf</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}