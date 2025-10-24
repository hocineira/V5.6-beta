'use client'

import { useState } from 'react'
import { Badge } from '../../../../components/ui/badge'
import { 
  ArrowLeft, Network, Server, Shield, Cable, 
  HardDrive, ZoomIn, ZoomOut, Download, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function InfrastructureS4P2() {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50))

  // Infrastructure details
  const infrastructureComponents = [
    {
      icon: Server,
      title: "Serveurs",
      items: [
        "Serveur Windows Server 2022 (AD DS, DHCP, DNS)",
        "Serveur Debian (Services web, bases de données)",
        "Serveur de virtualisation Proxmox VE"
      ]
    },
    {
      icon: Network,
      title: "Équipements Réseau",
      items: [
        "Switch Cisco Catalyst managé",
        "Routeur pfSense (Firewall, VPN)",
        "Points d'accès WiFi professionnels"
      ]
    },
    {
      icon: Shield,
      title: "Sécurité",
      items: [
        "Pare-feu pfSense avec règles de filtrage",
        "Segmentation réseau par VLANs",
        "VPN site-à-site et accès distant"
      ]
    },
    {
      icon: HardDrive,
      title: "Stockage",
      items: [
        "NAS Synology pour sauvegardes",
        "Stockage partagé SMB/NFS",
        "Réplication de données"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Animated background blobs */}
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
              href="/projets/scolaires" 
              className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à Projets Scolaires E6
            </Link>
          </div>

          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 rounded-full mb-8 shadow-lg shadow-cyan-500/10">
              <Network className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-semibold">Infrastructure - Plot S4P2</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
              <span className="block mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Infrastructure S4P2
              </span>
              <span className="block text-white text-4xl">
                IFC Marseille
              </span>
            </h1>

            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                <p className="text-slate-300 leading-relaxed text-lg">
                  Découvrez l'infrastructure réseau complète déployée sur mon plot attitré S4P2 au centre de formation IFC Marseille.
                  Cette infrastructure représente un environnement professionnel complet avec l'ensemble des ressources matérielles 
                  et logicielles nécessaires à la réalisation de mes projets sous la supervision de M. Bernard FERNANDEZ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Components Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {infrastructureComponents.map((component, index) => {
            const Icon = component.icon
            return (
              <div 
                key={index}
                className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-cyan-500/10 backdrop-blur-sm rounded-xl border border-cyan-500/20">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{component.title}</h3>
                </div>
                <ul className="space-y-3">
                  {component.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Schema Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-600/40 rounded-3xl shadow-2xl overflow-hidden">
          {/* Controls */}
          <div className="bg-slate-800/60 backdrop-blur-lg border-b border-slate-600/40 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cable className="w-6 h-6 text-cyan-400" />
                <span className="text-white font-bold text-lg">Schéma d'Infrastructure</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm px-3 py-1">
                  Plot S4P2
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom controls */}
                <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur-md rounded-xl p-2 border border-slate-600/40">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 text-cyan-300 hover:text-cyan-200 hover:bg-slate-600/50 rounded-lg transition-colors"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-white font-semibold px-3 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 text-cyan-300 hover:text-cyan-200 hover:bg-slate-600/50 rounded-lg transition-colors"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* Download button */}
                <button
                  className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-semibold px-6 py-2 rounded-xl transition-all"
                  onClick={() => {
                    // TODO: Add download functionality
                    alert('Fonctionnalité de téléchargement à venir')
                  }}
                >
                  <Download className="w-5 h-5" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>

          {/* Schema Viewer */}
          <div className="bg-slate-900/30 p-8 backdrop-blur-sm">
            <div 
              className="mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30"
              style={{ 
                width: `${zoom}%`,
                maxWidth: '100%',
                transition: 'width 0.3s ease'
              }}
            >
              {/* Placeholder for infrastructure schema */}
              <div className="aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-2xl mb-6 animate-pulse">
                    <Network className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Schéma d'infrastructure à venir
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto leading-relaxed text-lg">
                    Le schéma détaillé de l'infrastructure du plot S4P2 sera ajouté prochainement.
                  </p>
                  
                  {/* Uncomment and update when schema image is ready */}
                  {/* <img
                    src="/images/infrastructure-s4p2.png"
                    alt="Schéma Infrastructure S4P2"
                    className="w-full h-full object-contain"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            Environnement Technologique
          </h3>
          <div className="text-slate-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-cyan-300">Localisation :</strong> Centre de formation IFC Marseille - Salle réseau
            </p>
            <p>
              <strong className="text-cyan-300">Plot attitré :</strong> S4P2 (Système 4, Poste 2)
            </p>
            <p>
              <strong className="text-cyan-300">Supervision :</strong> M. Bernard FERNANDEZ, Tuteur de formation
            </p>
            <p>
              <strong className="text-cyan-300">Technologies déployées :</strong> Windows Server, Linux Debian, Cisco IOS, 
              pfSense, Proxmox VE, Active Directory, DHCP/DNS, VLANs, VPN IPsec/OpenVPN
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
