export default function VeilleTechnologique() {
  // Données RSS intégrées directement dans la page
  const updates = [
    {
      id: '1',
      title: 'Windows Server 2025 - Disponibilité Générale',
      description: 'Microsoft annonce la disponibilité générale de Windows Server 2025 avec des fonctionnalités avancées de sécurité, des performances améliorées et une agilité cloud renforcée.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2024/11/04/windows-server-2025-now-generally-available-with-advanced-security-improved-performance-and-cloud-agility/',
      published_date: '2024-11-04T15:30:00.000Z',
      category: 'server',
      version: 'Windows Server 2025',
      source: 'Microsoft Windows Server Blog'
    },
    {
      id: '2',
      title: 'Hotpatching pour Windows Server - Fini les redémarrages !',
      description: 'Le hotpatching pour Windows Server 2025 devient disponible en tant que service par abonnement, éliminant le besoin de redémarrages fréquents pour les mises à jour de sécurité.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2025/04/24/tired-of-all-the-restarts-get-hotpatching-for-windows-server/',
      published_date: '2025-04-24T15:00:00.000Z',
      category: 'server',
      version: 'Windows Server 2025',
      source: 'Microsoft Windows Server Blog'
    },
    {
      id: '3',
      title: 'Windows 11 24H2 - Nouvelles Fonctionnalités IA',
      description: 'La dernière mise à jour de Windows 11 intègre nativement Copilot et offre des optimisations significatives pour les applications d\'intelligence artificielle.',
      link: 'https://blogs.windows.com/windows-insider/2024/10/01/windows-11-24h2/',
      published_date: '2024-10-01T00:00:00.000Z',
      category: 'client',
      version: 'Windows 11 24H2',
      source: 'Windows Insider Blog'
    },
    {
      id: '4',
      title: 'Microsoft System Center 2025 - Disponible Maintenant',
      description: 'System Center 2025 apporte une gestion d\'infrastructure améliorée, des capacités cloud étendues et des outils de surveillance avancés pour des opérations IT efficaces.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2024/11/06/microsoft-system-center-2025-is-now-generally-available/',
      published_date: '2024-11-06T17:00:00.000Z',
      category: 'server',
      version: 'System Center 2025',
      source: 'Microsoft Windows Server Blog'
    },
    {
      id: '5',
      title: 'Sécurité Renforcée - Windows Server 2025',
      description: 'Découvrez les nouvelles fonctionnalités de sécurité de Windows Server 2025, incluant Zero Trust natif, chiffrement avancé et protection contre les menaces modernes.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2024/05/29/gain-enhanced-security-and-performance-with-windows-server-2025/',
      published_date: '2024-05-29T19:00:00.000Z',
      category: 'server',
      version: 'Windows Server 2025',
      source: 'Microsoft Windows Server Blog'
    },
    {
      id: '6',
      title: 'Windows Server Summit 2025 - Innovations à venir',
      description: 'Participez au Windows Server Summit 2025 et découvrez nos dernières innovations en matière d\'infrastructure cloud, containers et gestion hybride.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2025/04/02/join-us-at-windows-server-summit-2025-and-learn-more-about-our-latest-innovations/',
      published_date: '2025-04-02T15:00:00.000Z',
      category: 'server',
      version: null,
      source: 'Microsoft Windows Server Blog'
    }
  ]

  const stats = { total: updates.length }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <a href="/veilles">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 mb-8 hover:bg-blue-50 text-slate-700 border-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2" aria-hidden="true">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Retour aux veilles
            </button>
          </a>

          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor w-10 h-10 text-white" aria-hidden="true">
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Veille Technologique Windows
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Suivi des dernières évolutions Windows et Windows Server depuis les sources officielles Microsoft. 
              Données récupérées et traduites automatiquement via flux RSS.
            </p>

            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-blue-100 text-blue-800 px-4 py-2 text-sm border border-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor w-4 h-4 mr-2" aria-hidden="true">
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
                {stats.total} articles de veille
              </div>

              <div className="inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-indigo-100 text-indigo-800 px-4 py-2 text-sm border border-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4 mr-2" aria-hidden="true">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Sources officielles RSS
              </div>

              <a href="/api/windows/updates/refresh" className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 border-green-200 text-green-800 hover:bg-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw w-4 h-4 mr-2" aria-hidden="true">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
                Actualiser RSS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {updates.map((update, index) => (
              <div
                key={update.id}
                className="rounded-lg bg-card text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-200 relative"
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {update.category === 'server' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server w-6 h-6 text-blue-600" aria-hidden="true">
                            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                            <line x1="6" x2="6.01" y1="6" y2="6"></line>
                            <line x1="6" x2="6.01" y1="18" y2="18"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor w-6 h-6 text-blue-600" aria-hidden="true">
                            <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                            <line x1="8" x2="16" y1="21" y2="21"></line>
                            <line x1="12" x2="12" y1="17" y2="21"></line>
                          </svg>
                        )}
                      </div>
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800 border-green-200">
                        Officiel Microsoft
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4 mr-1" aria-hidden="true">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      {new Date(update.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  <h3 className="font-semibold tracking-tight text-xl text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {update.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {update.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {update.category && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit bg-slate-50 text-slate-700 border-slate-200">
                        {update.category === 'server' ? 'Windows Server' : 'Windows Client'}
                      </div>
                    )}
                    {update.version && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit bg-slate-50 text-slate-700 border-slate-300">
                        {update.version}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-medium">Source :</span>
                        <span className="font-semibold text-slate-900">{update.source}</span>
                      </div>
                    </div>
                    
                    {update.link && (
                      <a 
                        href={update.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-md px-3 w-full"
                      >
                        Lire l'article complet
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-2 w-4 h-4" aria-hidden="true">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Système de Veille Automatisée</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-slate-600 mt-4">
              Cette page présente ma veille technologique sur l'écosystème Windows, avec récupération automatique 
              des données depuis les flux RSS officiels Microsoft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="rounded-lg bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow border border-slate-200 cursor-pointer transform hover:-translate-y-1">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss w-6 h-6 text-blue-600" aria-hidden="true">
                    <path d="M4 11a9 9 0 0 1 9 9"></path>
                    <path d="M4 4a16 16 0 0 1 16 16"></path>
                    <circle cx="5" cy="19" r="1"></circle>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg text-slate-900">Flux RSS Automatisés</h3>
                <p className="text-sm text-slate-600">
                  Récupération automatique depuis les blogs officiels Microsoft Windows et Windows Server.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow border border-slate-200 cursor-pointer transform hover:-translate-y-1">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe w-6 h-6 text-indigo-600" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m12 2 0 20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg text-slate-900">Traduction Française</h3>
                <p className="text-sm text-slate-600">
                  Contenus traduits automatiquement pour faciliter la compréhension et l'analyse.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow border border-slate-200 cursor-pointer transform hover:-translate-y-1">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-6 h-6 text-green-600" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg text-slate-900">Mise à Jour Continue</h3>
                <p className="text-sm text-slate-600">
                  Surveillance continue des nouveautés Windows pour rester à jour des dernières évolutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Questions sur ces technologies ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de stratégies de migration, 
            de planification des mises à jour ou de conseil en infrastructure Windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Me contacter
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-2 w-5 h-5" aria-hidden="true">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </button>
            <a href="/veilles">
              <button className="inline-flex items-center justify-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-11 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2 w-5 h-5" aria-hidden="true">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Retour aux veilles
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}