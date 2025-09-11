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
    duree: '1 mois',
    lieu: 'Marseille, France',
    type: 'Stage d\'observation et pratique',
    secteur: 'Association d\'aide sociale',
    description: 'Association implantée dans les Bouches-du-Rhône depuis 1935, spécialisée dans l\'accompagnement de personnes en situation de handicap, la protection de l\'enfant et l\'accueil de la petite enfance.'
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
    { id: 1, src: '/images/stages/stage1.jpg', alt: 'Support technique', title: 'Assistance utilisateur et dépannage' },
    { id: 2, src: '/images/stages/stage2.jpg', alt: 'Configuration matériel', title: 'Préparation poste de travail' },
    { id: 3, src: '/images/stages/stage3.jpg', alt: 'Maintenance réseau', title: 'Installation et configuration réseau' },
    { id: 4, src: '/images/stages/stage4.jpg', alt: 'Gestion Active Directory', title: 'Administration des comptes utilisateurs' },
    { id: 5, src: '/images/stages/stage5.jpg', alt: 'Réparation matériel', title: 'Diagnostic et réparation PC' },
    { id: 6, src: '/images/stages/stage6.jpg', alt: 'Installation RJ45', title: 'Câblage réseau et prises murales' },
    { id: 7, src: '/images/stages/stage7.jpg', alt: 'Maintenance téléphonique', title: 'Support et configuration téléphones' },
    { id: 8, src: '/images/stages/stage8.jpg', alt: 'Tests et validation', title: 'Vérification du matériel configuré' },
    { id: 9, src: '/images/stages/stage9.jpg', alt: 'Documentation technique', title: 'Rédaction des procédures et guides' }
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
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
                  Durant ce stage de 1 mois chez <strong>Sauvegarde13</strong>, j'ai eu l'opportunité de mettre en pratique 
                  mes connaissances théoriques acquises en BTS SIO SISR. Cette expérience m'a permis de découvrir 
                  le monde professionnel de l'informatique et de développer mes compétences techniques dans un environnement réel.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  {stageInfo.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* À propos de Sauvegarde13 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/images/stages/sauvegarde13_logo.png"
                  alt="Logo Sauvegarde13"
                  width={200}
                  height={80}
                  className="h-16 w-auto"
                />
              </div>
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                <Building className="w-8 h-8 text-blue-600" />
                À propos de Sauvegarde13
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Une association historique
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Sauvegarde13</strong> est une association implantée dans les Bouches-du-Rhône depuis <strong>1935</strong>. 
                    Elle s'est développée au fil du temps dans l'objectif de renforcer le lien social et les solidarités.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Au quotidien, elle mène des missions diversifiées et participe à la mise en œuvre des politiques publiques 
                    en accueillant et en accompagnant des <strong>personnes en situation de handicap</strong>, des <strong>enfants et jeunes majeurs à protéger</strong>, 
                    ainsi que des <strong>jeunes enfants et leurs familles</strong>.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Protection de l'enfant</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accompagnement, prévention, médiation et soutien à la parentalité</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Handicap</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accueil, éducation, soin et accompagnement des personnes en situation de handicap</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Petite enfance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accueil collectif et contribution à l'insertion sociale d'enfants en difficulté</p>
                  </div>
                </div>
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
              Galerie de mes Missions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Aperçu visuel de mon travail quotidien et des différentes tâches accomplies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Container */}
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Mission Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-600/90 text-white rounded-full backdrop-blur-sm">
                      Mission {image.id}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {image.alt}
                  </p>
                  
                  {/* Preview Button */}
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir en grand
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Photos de missions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Types de missions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mois d'expérience</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Missions réussies</div>
            </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
          <div className="max-w-5xl max-h-[90vh] m-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
                setSelectedImage(images[prevIndex])
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
                setSelectedImage(images[nextIndex])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-3"
            >
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </button>
            
            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                  <p className="text-gray-300">{selectedImage.alt}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Mission {selectedImage.id}/9</div>
                  <div className="text-xs text-gray-500">Stage Sauvegarde13</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}