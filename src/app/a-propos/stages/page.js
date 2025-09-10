'use client'

import { 
  Building, 
  Calendar,
  MapPin,
  Clock,
  Users,
  Network,
  Server,
  Settings,
  Monitor,
  Smartphone,
  Wrench,
  ArrowLeft,
  CheckCircle,
  Eye,
  Download,
  X
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

export default function StagesPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const stageInfo = {
    entreprise: 'Sauvegarde13',
    periode: 'Mars 2025 - Mai 2025',
    duree: '3 mois',
    lieu: 'Marseille, France',
    type: 'Stage d\'observation et pratique'
  }

  const missions = [
    {
      title: 'Réparation et maintenance informatique',
      description: 'Réparation et maintenance des ordinateurs et téléphones de l\'organisation',
      icon: Wrench,
      category: 'Maintenance'
    },
    {
      title: 'Préparation matériel nouveaux arrivants',
      description: 'Préparation du nouveau matériel informatique (téléphones et PC portables) pour les nouveaux employés',
      icon: Monitor,
      category: 'Configuration'
    },
    {
      title: 'Gestion Active Directory',
      description: 'Création et suppression des utilisateurs de l\'Active Directory selon les mouvements du personnel',
      icon: Users,
      category: 'Administration'
    },
    {
      title: 'Installation réseau',
      description: 'Installation des prises RJ45 murales pour l\'infrastructure réseau',
      icon: Network,
      category: 'Infrastructure'
    }
  ]

  const images = [
    { id: 1, src: '/images/stages/stage1.jpg', alt: 'Mission 1', title: 'Réparation ordinateur' },
    { id: 2, src: '/images/stages/stage2.jpg', alt: 'Mission 2', title: 'Configuration matériel' },
    { id: 3, src: '/images/stages/stage3.jpg', alt: 'Mission 3', title: 'Active Directory' },
    { id: 4, src: '/images/stages/stage4.jpg', alt: 'Mission 4', title: 'Installation RJ45' },
    { id: 5, src: '/images/stages/stage5.jpg', alt: 'Mission 5', title: 'Maintenance téléphones' },
    { id: 6, src: '/images/stages/stage6.jpg', alt: 'Mission 6', title: 'Configuration réseau' },
    { id: 7, src: '/images/stages/stage7.jpg', alt: 'Mission 7', title: 'Diagnostic matériel' },
    { id: 8, src: '/images/stages/stage8.jpg', alt: 'Mission 8', title: 'Support technique' },
    { id: 9, src: '/images/stages/stage9.jpg', alt: 'Mission 9', title: 'Tests et validation' }
  ]

  const competences = [
    { nom: 'Dépannage informatique', niveau: '85%' },
    { nom: 'Active Directory', niveau: '75%' },
    { nom: 'Installation réseau', niveau: '70%' },
    { nom: 'Configuration matériel', niveau: '80%' },
    { nom: 'Support utilisateur', niveau: '90%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/a-propos" 
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à À propos</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Building className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Stages
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Découvrez mon expérience professionnelle en entreprise
          </p>
        </div>
      </section>

      {/* Stage Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl flex items-center justify-center gap-3">
                <Building className="w-8 h-8 text-blue-600" />
                Stage chez {stageInfo.entreprise}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Période</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.periode}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Durée</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.duree}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Lieu</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.lieu}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                  <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Type</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.type}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  Durant ce stage de 3 mois chez <strong>Sauvegarde13</strong>, j'ai eu l'opportunité de mettre en pratique 
                  mes connaissances théoriques acquises en BTS SIO SISR. Cette expérience m'a permis de découvrir 
                  le monde professionnel de l'informatique et de développer mes compétences techniques dans un environnement réel.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mes Missions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Les différentes tâches et responsabilités qui m'ont été confiées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {missions.map((mission, index) => {
              const Icon = mission.icon
              return (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {mission.title}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {mission.category}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {mission.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Photos de mes Missions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Aperçu visuel de mon travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-w-16 aspect-h-12 relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white text-center">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences développées */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compétences Développées
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Les compétences techniques acquises durant ce stage
            </p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {competences.map((competence, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {competence.nom}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {competence.niveau}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: competence.niveau }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal pour les images */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-[90vh] m-4 relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
              <h3 className="text-lg font-medium">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}