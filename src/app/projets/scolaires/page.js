'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Server, Network, ShieldCheck, Database, 
  Eye, Download, GraduationCap, Calendar, 
  CheckCircle, Clock, ArrowLeft, BookOpen
} from 'lucide-react'
import Link from 'next/link'

export default function ProjetsE6() {
  const projetsE6 = useMemo(() => [
    {
      id: 1,
      title: 'Développement d\'une application de gestion GLPI - E6',
      description: 'Création d\'une solution complète de gestion des incidents et du parc informatique avec GLPI, incluant personnalisation et intégration avec l\'Active Directory.',
      category: 'developpement',
      technologies: ['GLPI', 'PHP', 'MySQL', 'LDAP', 'JavaScript', 'CSS'],
      date: '2024-2025',
      status: 'completed',
      type: 'project',
      cadre: 'Projet scolaire BTS SIO',
      duree: '8 semaines',
      contexte: 'Développement d\'une solution de ticketing pour l\'établissement',
      objetifs: [
        'Déployer et configurer GLPI',
        'Intégrer avec Active Directory',
        'Personnaliser l\'interface utilisateur',
        'Former les utilisateurs'
      ],
      resultats: [
        'Solution opérationnelle en production',
        'Réduction de 70% du temps de traitement',
        'Interface intuitive et personnalisée',
        'Formation de 25+ utilisateurs'
      ],
      image: '/images/procedures/optimized_glpi_image.webp',
      icon: Database
    },
    {
      id: 2,
      title: 'Configuration avancée pfSense - E6',
      description: 'Mise en place d\'un pare-feu pfSense avec règles avancées, VPN, load balancing et monitoring pour un environnement de test scolaire.',
      category: 'securite',
      technologies: ['pfSense', 'IPsec', 'OpenVPN', 'HAProxy', 'SNMP', 'Nagios'],
      date: '2024',
      status: 'completed',
      type: 'project',
      cadre: 'Projet scolaire BTS SIO',
      duree: '6 semaines',
      contexte: 'Sécurisation de l\'infrastructure réseau pédagogique',
      objetifs: [
        'Configurer un pare-feu avancé',
        'Mettre en place des VPN',
        'Implémenter le load balancing',
        'Superviser les performances'
      ],
      resultats: [
        'Sécurité renforcée du réseau',
        'Accès VPN sécurisé mis en place',
        'Répartition de charge optimisée',
        'Monitoring proactif opérationnel'
      ],
      image: '/images/procedures/optimized_pfsense_image.webp',
      icon: ShieldCheck
    },
    {
      id: 3,
      title: 'Virtualisation avec Proxmox - E6',
      description: 'Déploiement d\'une infrastructure virtualisée complète avec Proxmox VE, incluant clustering, backup automatisé et haute disponibilité.',
      category: 'virtualisation',
      technologies: ['Proxmox VE', 'KVM', 'LXC', 'ZFS', 'Ceph', 'Ansible'],
      date: '2024',
      status: 'completed',
      type: 'project',
      cadre: 'Projet scolaire BTS SIO',
      duree: '5 semaines',
      contexte: 'Modernisation de l\'infrastructure de virtualisation',
      objetifs: [
        'Déployer un cluster Proxmox',
        'Configurer la haute disponibilité',
        'Automatiser les sauvegardes',
        'Optimiser les performances'
      ],
      resultats: [
        'Cluster 3 nœuds opérationnel',
        'HA fonctionnelle',
        'Sauvegardes automatisées',
        'Performances optimisées'
      ],
      image: '/images/procedures/optimized_proxmox_image.webp',
      icon: Server
    },
    {
      id: 4,
      title: 'Analyse de sécurité avec Kali Linux - E6',
      description: 'Réalisation d\'audits de sécurité complets avec Kali Linux, incluant tests de pénétration, analyse de vulnérabilités et rapport détaillé.',
      category: 'securite',
      technologies: ['Kali Linux', 'Nmap', 'Metasploit', 'Wireshark', 'Burp Suite', 'OWASP ZAP'],
      date: '2024',
      status: 'completed',
      type: 'project',
      cadre: 'Projet scolaire BTS SIO',
      duree: '4 semaines',
      contexte: 'Audit de sécurité de l\'infrastructure pédagogique',
      objetifs: [
        'Effectuer un scan de vulnérabilités',
        'Réaliser des tests de pénétration',
        'Analyser le trafic réseau',
        'Rédiger un rapport d\'audit'
      ],
      resultats: [
        '15 vulnérabilités identifiées',
        'Tests de pénétration réussis',
        'Analyse complète du trafic',
        'Rapport détaillé avec recommandations'
      ],
      image: '/images/procedures/optimized_kali_image.webp',
      icon: ShieldCheck
    }
  ], [])

  const stats = useMemo(() => ({
    total: projetsE6.length,
    completed: projetsE6.filter(p => p.status === 'completed').length,
    technologies: [...new Set(projetsE6.flatMap(p => p.technologies))].length,
    categories: [...new Set(projetsE6.map(p => p.category))].length
  }), [projetsE6])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/projets" 
              className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Projets Scolaires{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                E6
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto px-4">
              Explorez mes projets scolaires réalisés dans le cadre de l'épreuve E6 du BTS SIO SISR. 
              Ces projets démontrent ma capacité à concevoir et déployer des solutions techniques complètes.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {stats.total} Projets E6
              </Badge>
              <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                {stats.completed} Réalisés
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
                <Server className="w-4 h-4 mr-2" />
                {stats.technologies} Technologies
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                {stats.categories} Catégories
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projetsE6.map((projet) => {
            const Icon = projet.icon
            return (
              <Card key={projet.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                {/* Image */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <img 
                    src={projet.image} 
                    alt={projet.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      projet.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                    } text-white px-3 py-1`}>
                      {projet.status === 'completed' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terminé
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          En cours
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white px-3 py-1">
                      E6
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                          {projet.title}
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                          {projet.cadre}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {projet.description}
                  </p>

                  {/* Contexte */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contexte :</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{projet.contexte}</p>
                  </div>

                  {/* Objectifs */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objectifs :</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {projet.objetifs.slice(0, 2).map((obj, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                    {projet.technologies.length > 4 && (
                      <Badge className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                        +{projet.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {projet.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {projet.duree}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Documentation
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Découvrez tous mes projets
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Explorez l'ensemble de mes réalisations techniques, qu'elles soient issues de mes expériences professionnelles ou scolaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/projets/professionnels">
                <Server className="w-5 h-5 mr-2" />
                Projets E5
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/projets">
                <GraduationCap className="w-5 h-5 mr-2" />
                Toutes les procédures
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}