'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Code,
  Network,
  Shield,
  Server,
  Database,
  Globe,
  Heart,
  Football,
  Languages,
  BookOpen,
  Target,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const personalInfo = {
    name: 'Hocine IRATNI',
    age: 20,
    title: 'Étudiant en BTS SIO SISR',
    location: '71 Rue du Rouet, Marseille (13008)',
    phone: '07 53 36 45 11',
    email: 'hocineira@gmail.com',
    portfolio: 'https://iratnihocine.com',
    linkedin: 'https://fr.linkedin.com/in/iratni-hocine'
  }

  const education = [
    {
      degree: 'BTS SIO Option SISR',
      period: 'De septembre 2024 à juin 2026',
      institution: 'IFC Marseille',
      status: 'En cours',
      description: 'Services Informatiques aux Organisations - Spécialité Solutions d\'Infrastructure, Systèmes et Réseaux'
    },
    {
      degree: 'Licence 1 : INFORMATIQUE - MATHÉMATIQUES - MÉCANIQUE - PHYSIQUE',
      period: 'De septembre 2023 à juillet 2024',
      institution: 'Aix-Marseille Université Marseille',
      status: 'Validée',
      description: 'Formation pluridisciplinaire couvrant les bases scientifiques et informatiques'
    },
    {
      degree: 'Baccalauréat général',
      period: 'De septembre 2021 à juin 2022',
      institution: 'Lycée Privé International Alexandre Dumas, Algiers, Algérie',
      status: 'Obtenu',
      description: 'Formation générale avec bases scientifiques solides'
    }
  ]

  const experience = [
    {
      title: 'Assistant Technique, Fibre Optique',
      company: 'Entreprise de télécommunications',
      period: '2020',
      description: 'J\'ai assisté un technicien dans le montage et le raccordement de la fibre optique. J\'ai acquis une expérience pratique et une compréhension des normes techniques et du service à la clientèle.'
    }
  ]

  const technicalSkills = [
    {
      category: 'Certifications Cisco',
      skills: ['CCNA 1', 'CCNA 2'],
      icon: Network,
      level: 'Certifié'
    },
    {
      category: 'Mise en place d\'infrastructures réseau',
      skills: ['Configuration de VLANs', 'Gestion de switchs', 'Optimisation segmentation', 'Routeur Zyxel', 'pfSense', 'Switch Netgear'],
      icon: Shield,
      level: 'Avancé'
    },
    {
      category: 'Systèmes de Virtualisation',
      skills: ['Proxmox', 'Hyper-V', 'Gestion environnements virtualisés'],
      icon: Server,
      level: 'Confirmé'
    },
    {
      category: 'Maintenance informatique',
      skills: ['Diagnostic pannes matérielles', 'Installation OS Linux Debian Ubuntu', 'Windows Server 2022-2025'],
      icon: Database,
      level: 'Expert'
    },
    {
      category: 'Programmation en Langage',
      skills: ['Python', 'Java', 'Bases de programmation'],
      icon: Code,
      level: 'Débutant'
    }
  ]

  const languages = [
    { name: 'Français', level: 'Langue maternelle', flag: '🇫🇷' },
    { name: 'Arabe', level: 'Langue maternelle', flag: '🇩🇿' },
    { name: 'Anglais', level: 'B2', flag: '🇬🇧' },
    { name: 'Kabyle', level: 'A2', flag: '🏔️' }
  ]

  const interests = [
    { name: 'Réseaux et Infrastructures IT', icon: Network },
    { name: 'Technologie et Informatique', icon: Globe },
    { name: 'Sport (Football)', icon: Football }
  ]

  const qualities = [
    { name: 'Esprit d\'équipe', description: 'Capacité à travailler efficacement en groupe' },
    { name: 'Toujours à l\'écoute', description: 'Attentif aux besoins et aux retours' },
    { name: 'Serviable', description: 'Disponible pour aider et soutenir' },
    { name: 'Orienté vers la résolution de problèmes', description: 'Approche méthodique et solution-focused' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            À propos de moi
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Découvrez mon parcours, mes compétences et ma passion pour l'informatique
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
                Ma présentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  Je suis <strong>passionné par tout ce qui touche à l'informatique et aux nouvelles technologies</strong>. 
                  Apprenant et travaillant en équipe et cherchant à trouver des solutions aux problèmes, 
                  je suis désireux de contribuer positivement à tout projet qui me sera confié.
                </p>
                <p>
                  Actuellement étudiant en <strong>deuxième année de BTS Services Informatiques aux Organisations (option SISR)</strong>, 
                  je suis à la recherche d'un stage pratique dans le domaine de l'administration des systèmes et réseaux. 
                  Intéressé par vos projets numériques et la modernisation des infrastructures, 
                  je vous adresse ma candidature avec enthousiasme.
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
              Formation et diplômes obtenus
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
                        </Badge>
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

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Expérience Professionnelle
            </h2>
          </div>

          {experience.map((exp, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{exp.company}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compétences Informatiques
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Technologies et outils maîtrisés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skillGroup, index) => {
              const Icon = skillGroup.icon
              return (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {skillGroup.category}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {skillGroup.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Languages and Interests */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Languages */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Languages className="w-6 h-6 text-blue-600" />
                  Langues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{lang.name}</span>
                      </div>
                      <Badge variant="secondary">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Centres d'intérêt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{interest.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Qualities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mes Atouts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Qualités personnelles et professionnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualities.map((quality, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {quality.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {quality.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Restons en contact
              </h2>
              <p className="text-lg mb-6 text-blue-100">
                N'hésitez pas à me contacter pour discuter d'opportunités ou de projets
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Téléphone</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}