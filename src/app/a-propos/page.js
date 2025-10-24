'use client'

import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, FloatingElement, RotateIn } from '../../components/animations'

export default function AboutPage() {
  const education = [
    {
      degree: 'BTS SIO Option SISR',
      period: 'De septembre 2024 a juin 2026',
      institution: 'IFC Marseille',
      status: 'En cours',
      description: 'Services Informatiques aux Organisations - Specialite Solutions d Infrastructure, Systemes et Reseaux'
    },
    {
      degree: 'Licence 1 : INFORMATIQUE - MATHEMATIQUES - MECANIQUE - PHYSIQUE',
      period: 'Septembre 2023 - Janvier 2024',
      institution: 'Aix-Marseille Universite Marseille',
      status: 'Reorientation',
      description: 'Une annee de formation pluridisciplinaire - Reorientation vers le BTS SIO pour se specialiser en informatique'
    },
    {
      degree: 'Baccalaureat general',
      period: 'De septembre 2021 a juin 2022',
      institution: 'Lycee Prive International Alexandre Dumas, Algiers, Algerie',
      status: 'Obtenu',
      description: 'Formation generale avec bases scientifiques solides'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            A propos de moi
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Decouvrez mon parcours, mes competences et ma passion pour l'informatique
          </p>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Marseille, France</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">20 ans</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">BTS SIO SISR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Presentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Ma presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Passionné par <strong>l'univers de l'informatique et les technologies émergentes</strong>, j'ai trouvé ma voie 
                  après une année en licence pluridisciplinaire qui m'a permis de confirmer mon attrait pour le domaine technique. 
                  Cette réorientation vers le BTS SIO SISR a été une décision réfléchie pour me spécialiser dans ce qui me motive vraiment : 
                  <strong>l'infrastructure, les systèmes et les réseaux informatiques</strong>.
                </p>
                <p className="mb-4">
                  Curieux de nature et doté d'un esprit analytique, j'aime <strong>résoudre des problèmes complexes</strong> et 
                  comprendre le fonctionnement des systèmes. Mon approche collaborative et ma capacité d'adaptation me permettent 
                  de m'intégrer facilement dans une équipe et de contribuer efficacement aux projets qui me sont confiés.
                </p>
                <p>
                  Actuellement en <strong>deuxième année de BTS SIO option SISR</strong> à l'IFC Marseille, 
                  je développe mes compétences en administration système, sécurité réseau et virtualisation. 
                  Je suis à la recherche d'une <strong>alternance</strong> pour mettre en application mes connaissances 
                  et enrichir mon expérience professionnelle dans un environnement technique stimulant.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mon Parcours Scolaire
            </h2>
            <p className="text-lg text-gray-600">
              Formation et diplomes obtenus
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          {edu.degree}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          edu.status === 'En cours' 
                            ? 'bg-blue-100 text-blue-800' 
                            : edu.status === 'Obtenu'
                            ? 'bg-green-100 text-green-800'
                            : edu.status === 'Reorientation'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}