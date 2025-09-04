'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge.js'
import { Button } from '@/components/ui/button.js'
import { Card } from '@/components/ui/card.js'
import { 
  Server, Network, ShieldCheck, Database, 
  Eye, Download, Users, Calendar, 
  CheckCircle, Clock, ArrowLeft, Building
} from 'lucide-react'
import Link from 'next/link'

export default function ProjetsE5() {
  const projetsE5 = useMemo(() => [
    {
      id: 1,
      title: 'Mise en place d\'une infrastructure réseau complète - E5',
      description: 'Projet professionnel de déploiement d\'une infrastructure réseau sécurisée pour une PME de 50 employés avec pfSense, Active Directory, et monitoring Zabbix.',
      category: 'infrastructure',
      technologies: ['pfSense', 'Active Directory', 'Windows Server 2022', 'VLAN', 'Zabbix', 'GLPI'],
      date: '2024-2025', 
      status: 'completed',
      type: 'project',
      entreprise: 'Stage BTS SIO',
      duree: '6 semaines',
      contexte: 'Modernisation de l\'infrastructure réseau d\'une PME',
      objetifs: [
        'Sécuriser le réseau avec pfSense',
        'Implémenter Active Directory',
        'Mettre en place la supervision',
        'Segmenter le réseau avec VLANs'
      ],
      resultats: [
        'Réduction de 80% des incidents réseau',
        'Amélioration de la sécurité',
        'Centralisation de la gestion des utilisateurs',
        'Monitoring proactif des équipements'
      ],
      image: '/images/procedures/optimized_mon_schema_reseau_personnel.webp',
      icon: Server
    },
    {
      id: 2,
      title: 'Migration vers Windows Server 2022 - E5',
      description: 'Migration complète d\'un domaine Active Directory de Windows Server 2016 vers 2022 avec zéro interruption de service.',
      category: 'systeme',
      technologies: ['Windows Server 2022', 'Active Directory', 'PowerShell', 'DHCP', 'DNS'],
      date: '2024',
      status: 'completed',
      type: 'project',
      entreprise: 'Entreprise partenaire',
      duree: '4 semaines',
      contexte: 'Modernisation du parc serveur',
      objetifs: [
        'Migrer sans interruption de service',
        'Mettre à jour les fonctionnalités AD',
        'Améliorer les performances',
        'Renforcer la sécurité'
      ],
      resultats: [
        'Migration réussie sans downtime',
        'Performances améliorées de 40%',
        'Nouvelles fonctionnalités de sécurité',
        'Formation des équipes réalisée'
      ],
      image: '/images/procedures/optimized_ad_image.webp',
      icon: Database
    },
    {
      id: 3,
      title: 'Déploiement d\'une solution de supervision - E5',
      description: 'Implémentation d\'une solution de supervision complète avec Zabbix pour monitorer 150+ équipements réseau et serveurs.',
      category: 'monitoring',
      technologies: ['Zabbix', 'SNMP', 'MySQL', 'Grafana', 'Linux'],
      date: '2024',
      status: 'completed',
      type: 'project',
      entreprise: 'Stage BTS SIO',
      duree: '3 semaines',
      contexte: 'Besoin de supervision proactive',
      objetifs: [
        'Monitorer tous les équipements',
        'Alertes automatisées',
        'Tableaux de bord visuels',
        'Historisation des données'
      ],
      resultats: [
        '150+ équipements supervisés',
        'Temps de résolution réduit de 60%',
        'Prévention des pannes',
        'Reporting automatisé'
      ],
      image: '/images/procedures/optimized_zabbix_image.webp',
      icon: Eye
    }
  ], [])

  const stats = useMemo(() => ({
    total: projetsE5.length,
    completed: projetsE5.filter(p => p.status === 'completed').length,
    technologies: [...new Set(projetsE5.flatMap(p => p.technologies))].length,
    entreprises: [...new Set(projetsE5.map(p => p.entreprise))].length
  }), [projetsE5])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/projets" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Projets Professionnels{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                E5
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto px-4">
              Découvrez mes projets professionnels réalisés dans le cadre de l'épreuve E5 du BTS SIO SISR. 
              Chaque projet reflète une expérience concrète en entreprise avec des enjeux réels.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
                <Building className="w-4 h-4 mr-2" />
                {stats.total} Projets E5
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                {stats.completed} Réalisés
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
                <Server className="w-4 h-4 mr-2" />
                {stats.technologies} Technologies
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                {stats.entreprises} Entreprises
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projetsE5.map((projet) => {
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
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      E5
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                          {projet.title}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {projet.entreprise}
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
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Rapport
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Intéressé par mes projets professionnels ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de mes expériences en entreprise et de mes réalisations techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Me contacter
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/projets/scolaires">
                <Server className="w-5 h-5 mr-2" />
                Voir les projets E6
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}