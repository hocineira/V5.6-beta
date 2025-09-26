&apos;use client&apos;

import { useState, useEffect } from &apos;react&apos;
import Link from &apos;next/link&apos;
import { usePathname } from &apos;next/navigation&apos;
import { Menu, X, Home, User, GraduationCap, ShieldCheck, FolderOpen, Eye, Server, Network, ChevronDown, Building, BookOpen } from &apos;lucide-react&apos;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null) // null = fermé, &apos;about&apos; = À propos ouvert, &apos;projects&apos; = Projets ouvert
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener(&apos;scroll&apos;, handleScroll)
    return () => window.removeEventListener(&apos;scroll&apos;, handleScroll)
  }, [])

  // Fonction pour basculer un dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdownId(prev => prev === dropdownId ? null : dropdownId)
  }

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ne pas fermer si on clique sur un bouton de dropdown ou sur le contenu du dropdown
      if (event.target.closest(&apos;button[data-dropdown]&apos;) || 
          event.target.closest(&apos;[data-dropdown-content]&apos;)) {
        return
      }
      setOpenDropdownId(null)
    }

    if (openDropdownId) {
      document.addEventListener(&apos;click&apos;, handleClickOutside)
      return () => document.removeEventListener(&apos;click&apos;, handleClickOutside)
    }
  }, [openDropdownId])

  const navigation = [
    {
      name: &apos;Accueil&apos;,
      href: &apos;/accueil&apos;,
      icon: Home,
      description: &apos;Découvrez mon profil&apos;
    },
    {
      name: &apos;À propos&apos;,
      href: &apos;/a-propos&apos;,
      icon: User,
      description: &apos;Mon parcours et mes compétences&apos;,
      hasDropdown: true,
      submenu: [
        {
          name: &apos;À propos de moi&apos;,
          href: &apos;/a-propos&apos;,
          icon: User,
          description: &apos;Mon parcours et mes compétences&apos;
        },
        {
          name: &apos;Mes Stages&apos;,
          href: &apos;/a-propos/stages&apos;,
          icon: Building,
          description: &apos;Mon expérience en entreprise&apos;
        }
      ]
    },
    {
      name: &apos;TCS&apos;,
      href: &apos;/tcs&apos;,
      icon: ShieldCheck,
      description: &apos;Technicien Cybersécurité&apos;
    },
    {
      name: &apos;BTS SIO&apos;,
      href: &apos;/bts-sio&apos;,
      icon: GraduationCap,
      description: &apos;Ma formation&apos;
    },
    {
      name: &apos;Projets&apos;,
      href: &apos;/projets&apos;,
      icon: FolderOpen,
      description: &apos;Mes réalisations SISR&apos;,
      hasDropdown: true,
      submenu: [
        {
          name: &apos;Toutes les procédures&apos;,
          href: &apos;/projets&apos;,
          icon: FolderOpen,
          description: &apos;Procédures techniques détaillées&apos;
        },
        {
          name: &apos;Projets Professionnels E5&apos;,
          href: &apos;/projets/professionnels&apos;,
          icon: Building,
          description: &apos;Projets réalisés en entreprise&apos;
        },
        {
          name: &apos;Projets Scolaires E6&apos;,
          href: &apos;/projets/scolaires&apos;,
          icon: BookOpen,
          description: &apos;Projets académiques et scolaires&apos;
        }
      ]
    },
    {
      name: &apos;Veilles&apos;,
      href: &apos;/veilles&apos;,
      icon: Eye,
      description: &apos;Veille technologique&apos;
    }
  ]

  const isActive = (href) => {
    if (href === &apos;/projets&apos;) {
      return pathname === &apos;/projets&apos; || pathname.startsWith(&apos;/projets/&apos;)
    }
    if (href === &apos;/a-propos&apos;) {
      return pathname === &apos;/a-propos&apos; || pathname.startsWith(&apos;/a-propos/&apos;)
    }
    return pathname === href
  }

  const isProjectsActive = () => {
    return pathname === &apos;/projets&apos; || pathname.startsWith(&apos;/projets/&apos;)
  }

  const isAboutActive = () => {
    return pathname === &apos;/a-propos&apos; || pathname.startsWith(&apos;/a-propos/&apos;)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
        scrolled 
          ? &apos;glass-effect-strong border-b border-white/20 dark:border-gray-700/20 shadow-2xl shadow-black/10&apos; 
          : &apos;glass-effect border-b border-white/10 dark:border-gray-700/10 shadow-lg shadow-black/5&apos;
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Optimisé pour mobile */}
            <div className="flex-shrink-0">
              <Link href="/accueil" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Network className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Hocine IRATNI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  
                  // Menu avec dropdown pour Projets et À propos
                  if (item.hasDropdown) {
                    const isMenuActive = item.name === &apos;Projets&apos; ? isProjectsActive() : isAboutActive()
                    const dropdownId = item.name === &apos;Projets&apos; ? &apos;projects&apos; : &apos;about&apos;
                    const isOpen = openDropdownId === dropdownId
                    
                    return (
                      <div key={item.name} className="relative">
                        <button
                          data-dropdown={dropdownId}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleDropdown(dropdownId)
                          }}
                          className={`relative group flex items-center px-4 py-2 rounded-lg text-sm font-normal transition-all duration-300 glass-nav-item glass-shine ${
                            isMenuActive ? &apos;nav-active&apos; : &apos;&apos;
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                          <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            isOpen ? &apos;rotate-180&apos; : &apos;&apos;
                          }`} />
                          
                          {/* Tooltip */}
                          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {item.description}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                          </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                          <div 
                            data-dropdown-content="true"
                            className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-lg rounded-lg border border-white/20 dark:border-gray-700/20 overflow-hidden z-50"
                          >
                            {item.submenu.map((subItem) => {
                              const SubIcon = subItem.icon
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 ${
                                    isActive(subItem.href) ? &apos;bg-blue-50/50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400&apos; : &apos;text-gray-700 dark:text-gray-300&apos;
                                  }`}
                                  onClick={() => setOpenDropdownId(null)}
                                >
                                  <SubIcon className="w-4 h-4 mr-3" />
                                  <div>
                                    <div className="font-medium">{subItem.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }

                  // Menu normal
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={`relative group flex items-center px-4 py-2 rounded-lg text-sm font-normal transition-all duration-300 glass-nav-item glass-shine ${
                        isActive(item.href) ? &apos;nav-active&apos; : &apos;&apos;
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                      
                      {/* Tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Mobile menu button - Touch optimisé */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-glass-button glass-shine rounded-xl p-3 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 active:scale-95"
                style={{ minWidth: &apos;48px&apos;, minHeight: &apos;48px&apos; }}
                aria-label={isOpen ? &apos;Fermer le menu&apos; : &apos;Ouvrir le menu&apos;}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? &apos;rotate-45 opacity-0&apos; : &apos;rotate-0 opacity-100&apos;
                  }`}>
                    <Menu className="w-6 h-6" />
                  </span>
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? &apos;rotate-0 opacity-100&apos; : &apos;-rotate-45 opacity-0&apos;
                  }`}>
                    <X className="w-6 h-6" />
                  </span>
                </div>
                
                {/* Ripple effect on tap */}
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 opacity-0 pointer-events-none animate-ping" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Slide from right */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
        isOpen ? &apos;opacity-100 pointer-events-auto&apos; : &apos;opacity-0 pointer-events-none&apos;
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? &apos;opacity-100&apos; : &apos;opacity-0&apos;
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] mobile-glass-menu shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? &apos;translate-x-0&apos; : &apos;translate-x-full&apos;
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col py-6">
            {navigation.map((item, index) => {
              const Icon = item.icon
              
              // Menu avec submenu pour mobile
              if (item.hasDropdown) {
                const isMenuActive = item.name === &apos;Projets&apos; ? isProjectsActive() : isAboutActive()
                return (
                  <div key={item.name}>
                    {/* Menu principal */}
                    <Link
                      href={item.href}
                      className={`group flex items-center px-6 py-4 text-base font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 active:scale-95 ${
                        isMenuActive
                          ? &apos;text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 border-r-2 border-blue-600 dark:border-blue-400&apos;
                          : &apos;text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400&apos;
                      }`}
                      onClick={() => setIsOpen(false)}
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        minHeight: &apos;60px&apos; 
                      }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-200 ${
                        isMenuActive
                          ? &apos;bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/25&apos;
                          : &apos;bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400&apos;
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-sm mt-0.5 ${
                          isMenuActive
                            ? &apos;text-blue-500 dark:text-blue-400&apos;
                            : &apos;text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400&apos;
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isMenuActive && (
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </Link>
                    
                    {/* Sous-menus */}
                    <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700">
                      {item.submenu.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`group flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 active:scale-95 ${
                              isActive(subItem.href)
                                ? &apos;text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10&apos;
                                : &apos;text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400&apos;
                            }`}
                            onClick={() => setIsOpen(false)}
                            style={{ 
                              animationDelay: `${(index * 50) + (subIndex * 25)}ms`,
                              minHeight: &apos;50px&apos; 
                            }}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
                              isActive(subItem.href)
                                ? &apos;bg-blue-500 dark:bg-blue-600 text-white shadow-md shadow-blue-500/25&apos;
                                : &apos;bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400&apos;
                            }`}>
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{subItem.name}</div>
                              <div className={`text-xs mt-0.5 ${
                                isActive(subItem.href)
                                  ? &apos;text-blue-500 dark:text-blue-400&apos;
                                  : &apos;text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400&apos;
                              }`}>
                                {subItem.description}
                              </div>
                            </div>
                            {isActive(subItem.href) && (
                              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              // Menu normal
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-6 py-4 text-base font-medium transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 active:scale-95 ${
                    isActive(item.href)
                      ? &apos;text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 border-r-2 border-blue-600 dark:border-blue-400&apos;
                      : &apos;text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400&apos;
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    minHeight: &apos;60px&apos; 
                  }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-200 ${
                    isActive(item.href)
                      ? &apos;bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/25&apos;
                      : &apos;bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600 dark:group-hover:text-blue-400&apos;
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-sm mt-0.5 ${
                      isActive(item.href)
                        ? &apos;text-blue-500 dark:text-blue-400&apos;
                        : &apos;text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400&apos;
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive(item.href) && (
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Portfolio • Hocine IRATNI
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                BTS SIO SISR
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}