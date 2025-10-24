'use client'

import { useState } from 'react'
import { Badge } from '../../../../components/ui/badge'
import { 
  ArrowLeft, Network, Server, Shield, Cable, 
  HardDrive, ZoomIn, ZoomOut, Download, CheckCircle2, Package, Laptop
} from 'lucide-react'
import Link from 'next/link'

export default function InfrastructureS4P2() {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50))

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

      {/* Schema Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
                <a
                  href="https://customer-assets.emergentagent.com/job_preview-display-8/artifacts/h2cxdajd_S4P2.jpeg"
                  download="Infrastructure-S4P2.jpeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-semibold px-6 py-2 rounded-xl transition-all"
                >
                  <Download className="w-5 h-5" />
                  Télécharger
                </a>
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
              <div className="aspect-[16/10] relative">
                <img
                  src="https://customer-assets.emergentagent.com/job_preview-display-8/artifacts/h2cxdajd_S4P2.jpeg"
                  alt="Schéma Infrastructure S4P2"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ressources Matérielles Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
              <Server className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">RESSOURCES MATÉRIELLES</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un PC avec clavier et souris USB, utilisé comme base pour construire et configurer l'infrastructure, et pour l'administration de celle-ci ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un PC portable utilisé comme PC Client pour simuler des utilisateurs du SI (Système d'Information) de l'organisation ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un PC avec un disque dur (4To) attribué à un serveur PROXMOX VE (environnement de virtualisation utilisé pour héberger et administrer des serveurs virtualisés) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un espace disque de stockage dédié aux serveurs virtuels PROXMOX sur un serveur de sauvegarde PROXMOX BACKUP ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un PC avec un disque dur attribué à un serveur PFSENSE (routeur/Firewall) possédant 3 cartes réseaux et donc 3 ports Ethernet ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un PC avec un disque dur attribué à un serveur HYPERV pour la virtualisation qui sera utilisé pour serveurs accessible de l'extérieur du réseau et mise à disposition de réseaux externes (comme un serveur WEB par exemple) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Trois écrans VGA/HDMI ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Une prise Ethernet murale, reliée au réseau WAN de l'établissement IFC Marseille, jouant le rôle d'arrivée internet de l'infrastructure ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Des câbles Ethernet RJ45 en nombre suffisant ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un commutateur réseau NETGEAR GS308Ev4 (8 ports, prenant en charge l'étiquetage des trames 802.1Q) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Deux multiprises ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Des CLES USB 30Go pour les installations de systèmes d'exploitation sur les machines physiques.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ressources Logicielles Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
              <Package className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">RESSOURCES LOGICIELLES</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un serveur NAS commun aux BTS SIO de l'établissement auquel nous avons accès via des identifiants personnels contenant des ressources indispensables à notre progression (cours, procédures, travaux d'autres étudiants, logiciels, etc.) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel NETGEAR SWITCH DISCOVERY TOOL (1.2.103) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration NETGEAR GS308Ev4 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel BALENA ETCHER (1.18.11) pour la création de clé USB d'installation d'OS ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Routeur-Firewall PFSENSE (2.7.2) – basé sur une distribution BSD OS ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Administration WEB PFSENSE ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>SNORT IDS (Intrusion détection system) sur PfSense ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution d'environnement de virtualisation PROXMOX VE (8.2) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration PROXMOX VE ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de sauvegarde des données des machines virtuelles PROXMOX BACKUP SERVER (3.0) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>OS Windows Server 2022 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Gestion de ressource réseau Active Directory + Annuaire LDAP ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de messagerie Microsoft EXCHANGE 2019 (CU14) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Distribution LINUX Debian 12 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Gestion de base de données MariaDB et MySQL ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de supervision réseau ZABBIX (7.0 LTS) ainsi que la version 7.0.x de l'agent d'écoute ZABBIX ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB D'administration ZABBIX ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Proxy ARTICA (version communautaire ISO Artica 4.50 sous Debian 10) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration ARTICA ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration D-Link DAP1360 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'identification du Portail Captif ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Distribution LINUX Ubuntu (22.04 LTS) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution GLPI (10.0.18) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel client OpenVPN (2.6.7) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>RDP Bureau distant pour accès SERVEUR AD1 et serveur HYPER-V ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Cloud intranet NEXTCLOUD (sous Ubuntu 22.04) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel sauvegarde Cobian Backup Gravity 11 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel de gestion lecteur réseaux RAIDRIVE.</p>
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
              <strong className="text-cyan-300">Technologies déployées :</strong> Windows Server 2022, Linux Debian/Ubuntu, NETGEAR GS308Ev4, 
              pfSense 2.7.2, Proxmox VE 8.2, Active Directory, DHCP/DNS, VLANs, VPN OpenVPN, Exchange 2019, Zabbix 7.0, GLPI, NextCloud
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
