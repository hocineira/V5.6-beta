&apos;use client&apos;

import { useState, useEffect } from &apos;react&apos;
import { GraduationCap, BookOpen, Target, Users, Award, CheckCircle, ArrowRight, Building, Briefcase, TrendingUp, Calendar, Star, Code, Server, Database, Network, Shield, Monitor, Terminal, Cpu, Globe, Cloud, Zap, Play, ExternalLink, ChevronRight, Clock, MapPin, Lightbulb, Brain, Trophy, Rocket, Settings, FileCode } from &apos;lucide-react&apos;
import { Button } from &apos;../../components/ui/button&apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from &apos;../../components/ui/card&apos;
import { Badge } from &apos;../../components/ui/badge&apos;

export default function BTSSIOPage() {
  const [activeTab, setActiveTab] = useState(&apos;overview&apos;)
  const [typedText, setTypedText] = useState(&apos;&apos;)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSpecialization, setSelectedSpecialization] = useState(null)

  const fullText = "BTS SIO_2025 > Formez-vous aux métiers du numérique_"

  // Animation de frappe pour le hero
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  const tabs = [
    { id: &apos;overview&apos;, label: &apos;Vue d\&apos;ensemble&apos;, icon: Globe },
    { id: &apos;specializations&apos;, label: &apos;Spécialisations&apos;, icon: Target },
    { id: &apos;program&apos;, label: &apos;Programme&apos;, icon: BookOpen },
    { id: &apos;career&apos;, label: &apos;Débouchés&apos;, icon: Rocket }
  ]

  const specializations = [
    {
      id: &apos;sisr&apos;,
      name: &apos;SISR&apos;,
      fullName: &apos;Solutions d\&apos;Infrastructure, Systèmes et Réseaux&apos;,
      color: &apos;from-cyan-500 to-blue-600&apos;,
      icon: Server,
      description: &apos;Administration systèmes, gestion des réseaux et infrastructure IT&apos;,
      focus: &apos;Infrastructure & Sécurité&apos;,
      skills: [&apos;Administration Systèmes&apos;, &apos;Réseaux & Télécoms&apos;, &apos;Virtualisation&apos;, &apos;Cybersécurité&apos;, &apos;Cloud Computing&apos;, &apos;Supervision&apos;],
      careers: [&apos;Administrateur systèmes/réseaux&apos;, &apos;Technicien infrastructure&apos;, &apos;Consultant IT&apos;, &apos;Responsable sécurité&apos;],
      tools: [&apos;VMware&apos;, &apos;Cisco&apos;, &apos;Windows Server&apos;, &apos;Linux&apos;, &apos;pfSense&apos;, &apos;Zabbix&apos;]
    },
    {
      id: &apos;slam&apos;,
      name: &apos;SLAM&apos;,
      fullName: &apos;Solutions Logicielles et Applications Métiers&apos;,
      color: &apos;from-purple-500 to-pink-600&apos;,
      icon: Code,
      description: &apos;Développement d\&apos;applications et solutions logicielles métier&apos;,
      focus: &apos;Développement & Innovation&apos;,
      skills: [&apos;Programmation Objet&apos;, &apos;Développement Web/Mobile&apos;, &apos;Bases de Données&apos;, &apos;DevOps&apos;, &apos;Architecture Logicielle&apos;, &apos;Tests & Qualité&apos;],
      careers: [&apos;Développeur full-stack&apos;, &apos;Développeur mobile&apos;, &apos;Analyste-programmeur&apos;, &apos;Chef de projet technique&apos;],
      tools: [&apos;JavaScript&apos;, &apos;Python&apos;, &apos;Java&apos;, &apos;React&apos;, &apos;Node.js&apos;, &apos;MySQL&apos;, &apos;Git&apos;]
    }
  ]

  const timelineData = [
    { year: &apos;Année 1&apos;, title: &apos;Fondamentaux&apos;, items: [&apos;Base de l\&apos;informatique&apos;, &apos;Première spécialisation&apos;, &apos;Stage 5 semaines&apos;] },
    { year: &apos;Année 2&apos;, title: &apos;Expertise&apos;, items: [&apos;Approfondissement technique&apos;, &apos;Projet professionnel&apos;, &apos;Stage 5 semaines&apos;] }
  ]

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Stats Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: &apos;Durée&apos;, value: &apos;2 ans&apos;, icon: Clock, color: &apos;bg-gradient-to-r from-cyan-500 to-blue-600&apos; },
          { label: &apos;Niveau&apos;, value: &apos;Bac+2&apos;, icon: GraduationCap, color: &apos;bg-gradient-to-r from-purple-500 to-pink-600&apos; },
          { label: &apos;Spécialisations&apos;, value: &apos;2&apos;, icon: Target, color: &apos;bg-gradient-to-r from-green-500 to-teal-600&apos; },
          { label: &apos;Débouchés&apos;, value: &apos;15+&apos;, icon: Rocket, color: &apos;bg-gradient-to-r from-orange-500 to-red-600&apos; }
        ].map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group hover:scale-105 transition-all duration-300 border-0 shadow-lg">
            <div className={`absolute inset-0 ${stat.color} opacity-10`}></div>
            <CardContent className="p-3 sm:p-6 relative">
              <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
                <div className="mb-2 sm:mb-0">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                </div>
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Description moderne */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-50 to-blue-50">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Une formation d&apos;excellence</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Le BTS SIO forme des professionnels polyvalents capables de répondre aux enjeux numériques 
                des organisations modernes. Entre infrastructure et développement, trouvez votre voie.
              </p>
              <div className="flex flex-wrap gap-2">
                {[&apos;Innovation&apos;, &apos;Polyvalence&apos;, &apos;Excellence&apos;, &apos;Avenir&apos;].map((tag) => (
                  <Badge key={tag} className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Brain, label: &apos;Apprentissage&apos;, desc: &apos;Pédagogie active&apos; },
                { icon: Lightbulb, label: &apos;Innovation&apos;, desc: &apos;Technologies récentes&apos; },
                { icon: Users, label: &apos;Accompagnement&apos;, desc: &apos;Suivi personnalisé&apos; },
                { icon: Trophy, label: &apos;Réussite&apos;, desc: &apos;Taux d\&apos;insertion élevé&apos; }
              ].map((item, index) => (
                <div key={index} className="text-center p-3 sm:p-4 rounded-lg bg-white/50 hover:bg-white transition-colors">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{item.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSpecializations = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Choisissez votre spécialisation</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Deux parcours distincts pour répondre à vos aspirations professionnelles
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {specializations.map((spec) => (
          <Card 
            key={spec.id} 
            className={`group cursor-pointer border-0 shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 ${
              selectedSpecialization === spec.id ? &apos;ring-4 ring-blue-300&apos; : &apos;&apos;
            }`}
            onClick={() => setSelectedSpecialization(selectedSpecialization === spec.id ? null : spec.id)}
          >
            <div className={`h-2 bg-gradient-to-r ${spec.color}`}></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${spec.color} flex items-center justify-center flex-shrink-0`}>
                  <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-2xl text-gray-900">{spec.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-sm sm:text-base">{spec.focus}</CardDescription>
                </div>
                <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  selectedSpecialization === spec.id ? &apos;rotate-90&apos; : &apos;&apos;
                }`} />
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">{spec.description}</p>
              
              {selectedSpecialization === spec.id && (
                <div className="space-y-6 animate-slide-in-up">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                      <Settings className="w-4 h-4 mr-2" />
                      Compétences développées
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {spec.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="justify-start text-xs w-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Débouchés principaux
                    </h4>
                    <ul className="space-y-1">
                      {spec.careers.map((career, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2 text-gray-400" />
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FileCode className="w-4 h-4 mr-2" />
                      Outils & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {spec.tools.map((tool, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProgram = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Programme de formation</h3>
        <p className="text-gray-600">Un cursus progressif sur 2 années</p>
      </div>
      
      {/* Timeline - Mobile Optimized */}
      <div className="relative">
        {/* Desktop: Center line, Mobile: Left line */}
        <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>
        
        {timelineData.map((year, index) => (
          <div key={index} className="relative mb-8">
            {/* Mobile: Full width, Desktop: Alternating sides */}
            <div className={`sm:flex sm:items-center ${index % 2 === 0 ? &apos;sm:justify-start&apos; : &apos;sm:justify-end&apos;}`}>
              <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${index % 2 === 0 ? &apos;sm:pr-8&apos; : &apos;sm:pl-8&apos;}`}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <span className="text-base sm:text-xl">{year.year}</span>
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg font-semibold text-gray-900 ml-11 sm:ml-0">
                      {year.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {year.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                          <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline dot - Mobile: Left aligned, Desktop: Center */}
            <div className="absolute left-6 top-6 sm:left-1/2 sm:top-8 sm:transform sm:-translate-x-1/2 w-4 h-4 bg-white border-4 border-cyan-500 rounded-full z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Matières communes */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Enseignements transversaux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              &apos;Support et mise à disposition de services informatiques&apos;,
              &apos;Mathématiques pour l\&apos;informatique&apos;,
              &apos;Algorithmique appliquée&apos;,
              &apos;Analyse économique et managériale&apos;,
              &apos;Expression et communication&apos;,
              &apos;Anglais professionnel&apos;
            ].map((subject, index) => (
              <div key={index} className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                <span className="text-gray-800 font-medium text-sm sm:text-base break-words">{subject}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCareer = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Votre avenir professionnel</h3>
        <p className="text-gray-600">De nombreuses opportunités dans le secteur du numérique</p>
      </div>
      
      {/* Secteurs d&apos;activité - Mobile Optimized */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
        {[
          { icon: Building, title: &apos;Entreprises&apos;, desc: &apos;Services informatiques intégrés&apos;, color: &apos;from-blue-500 to-cyan-600&apos; },
          { icon: Cloud, title: &apos;SSII/ESN&apos;, desc: &apos;Sociétés de services numériques&apos;, color: &apos;from-purple-500 to-pink-600&apos; },
          { icon: Zap, title: &apos;Start-ups&apos;, desc: &apos;Innovation et nouvelles technologies&apos;, color: &apos;from-orange-500 to-red-600&apos; }
        ].map((sector, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${sector.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <sector.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{sector.title}</h4>
              <p className="text-gray-600 text-sm">{sector.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Salaires et évolution - Mobile Optimized */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Évolution salariale
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Débutant (0-2 ans)</span>
                  <Badge className="bg-green-100 text-green-800 self-start sm:self-center">25-30k€</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Confirmé (3-5 ans)</span>
                  <Badge className="bg-blue-100 text-blue-800 self-start sm:self-center">32-40k€</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Senior (5+ ans)</span>
                  <Badge className="bg-purple-100 text-purple-800 self-start sm:self-center">40-55k€</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                Poursuites d&apos;études
              </h4>
              <ul className="space-y-3">
                {[
                  &apos;Licence professionnelle Informatique&apos;,
                  &apos;École d\&apos;ingénieurs (admissions parallèles)&apos;,
                  &apos;Bachelor spécialisé&apos;,
                  &apos;Master en alternance&apos;
                ].map((option, index) => (
                  <li key={index} className="flex items-start sm:items-center p-3 bg-white rounded-lg">
                    <ArrowRight className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch(activeTab) {
      case &apos;overview&apos;: return renderOverview()
      case &apos;specializations&apos;: return renderSpecializations()
      case &apos;program&apos;: return renderProgram()
      case &apos;career&apos;: return renderCareer()
      default: return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section - Mobile Optimized Terminal Style */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 opacity-95"></div>
        
        {/* Animated background elements - Reduced on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Terminal Window - Mobile Optimized */}
            <div className="bg-slate-800 rounded-t-xl p-3 sm:p-4 mb-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400 text-xs sm:text-sm ml-2 sm:ml-4">formation_info.sh</span>
              </div>
            </div>
            
            <div className="bg-black rounded-b-xl p-4 sm:p-8 font-mono text-left">
              <div className="text-green-400 text-sm sm:text-lg">
                $ <span className="text-cyan-300">{typedText}</span>
                <span className="animate-pulse">|</span>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    BTS SIO
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-slate-300 mb-4 sm:mb-6 px-2">
                  Services Informatiques aux Organisations
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50 px-3 py-2 sm:px-4">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Niveau 5 (Bac+2)</span>
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 px-3 py-2 sm:px-4">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">2 années</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs - Mobile Optimized */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-center">
            {/* Mobile: Scrollable horizontal tabs */}
            <nav className="flex space-x-1 p-2 overflow-x-auto scrollbar-hide w-full max-w-full sm:w-auto">
              <div className="flex space-x-1 min-w-max sm:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? &apos;bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105&apos;
                        : &apos;text-gray-600 hover:text-gray-900 hover:bg-gray-100&apos;
                    }`}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                    <span className="xs:hidden sm:hidden">{tab.label.split(&apos; &apos;)[0]}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Tab Content - Mobile Optimized */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Prêt à rejoindre l&apos;aventure BTS SIO ?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8">
              Transformez votre passion pour l&apos;informatique en expertise professionnelle
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={() => window.location.href = &apos;mailto:hocineira@gmail.com&apos;}
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Commencer maintenant</span>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={() => window.open(&apos;/tcs&apos;, &apos;_self&apos;)}
              >
                <ExternalLink className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Voir mon parcours</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}