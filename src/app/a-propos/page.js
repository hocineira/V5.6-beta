'use client'

import { 
  User, 
  GraduationCap, 
  Briefcase,
  MapPin, 
  Calendar,
  Code,
  Network,
  Shield,
  Server,
  Database,
  Globe,
  Heart,
  Football,
  Languages,
  Target,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            A propos de moi
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Decouvrez mon parcours, mes competences et ma passion pour l'informatique
          </p>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Marseille, France</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">20 ans</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">BTS SIO SISR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Presentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Ma presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  Je suis <strong>passionne par tout ce qui touche a l'informatique et aux nouvelles technologies</strong>. 
                  Apprenant et travaillant en equipe et cherchant a trouver des solutions aux problemes, 
                  je suis desireux de contribuer positivement a tout projet qui me sera confie.
                </p>
                <p>
                  Actuellement etudiant en <strong>deuxieme annee de BTS Services Informatiques aux Organisations (option SISR)</strong>, 
                  je suis a la recherche d'un stage pratique dans le domaine de l'administration des systemes et reseaux.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mon Parcours Scolaire
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Formation et diplomes obtenus
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          edu.status === 'En cours' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : edu.status === 'Obtenu'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{edu.institution}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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