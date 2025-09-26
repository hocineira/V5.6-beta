&apos;use client&apos;

import React, { useState, useEffect } from &apos;react&apos;
import { useRouter, usePathname } from &apos;next/navigation&apos;
import { Home, User, ShieldCheck, GraduationCap, FolderOpen, Eye } from &apos;lucide-react&apos;

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [navigating, setNavigating] = useState(null)

  // Reset navigation state when pathname changes
  useEffect(() => {
    setNavigating(null)
  }, [pathname])

  const navigation = [
    {
      name: &apos;Accueil&apos;,
      href: &apos;/accueil&apos;,
      icon: Home,
    },
    {
      name: &apos;À propos&apos;,
      href: &apos;/a-propos&apos;,
      icon: User,
    },
    {
      name: &apos;TCS&apos;,
      href: &apos;/tcs&apos;,
      icon: ShieldCheck,
    },
    {
      name: &apos;BTS SIO&apos;,
      href: &apos;/bts-sio&apos;,
      icon: GraduationCap,
    },
    {
      name: &apos;Projets&apos;,
      href: &apos;/projets&apos;,
      icon: FolderOpen,
    },
    {
      name: &apos;Veilles&apos;,
      href: &apos;/veilles&apos;,
      icon: Eye,
    }
  ]

  const isActive = (href) => pathname === href

  const handleNavigation = (href, name) => {
    if (href === pathname) return // Déjà sur la page
    
    // Feedback haptique pour mobile supprimé pour optimisation
    
    // Feedback visuel immédiat
    setNavigating(name)
    
    // Navigation avec animation fluide
    router.push(href)
    
    // Reset avec délai optimisé
    setTimeout(() => {
      setNavigating(null)
    }, 600)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden mobile-nav-optimized">{/* Restauré pour mobile uniquement */}
      {/* Safe area padding pour les smartphones avec encoche */}
      <div className="safe-area-bottom mobile-glass-menu border-t border-white/30 dark:border-gray-700/30">{/* Effet glass appliqué */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-around">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              const isNavigatingToThis = navigating === item.name
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.name)}
                  disabled={isNavigatingToThis}
                  className={`bottom-nav-item touch-target-large flex flex-col items-center justify-center px-2 py-2 rounded-xl relative transition-all duration-200 transform ${
                    active
                      ? &apos;text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/40 backdrop-blur-sm scale-105 shadow-lg&apos;
                      : isNavigatingToThis
                      ? &apos;text-blue-500 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-900/20 backdrop-blur-sm scale-95&apos;
                      : &apos;text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm active:scale-95&apos;
                  }`}
                  style={{ 
                    minWidth: &apos;60px&apos;, 
                    minHeight: &apos;56px&apos;,
                    willChange: &apos;transform&apos;
                  }}
                >
                  <Icon className={`w-6 h-6 mb-1 transition-all duration-200 ${
                    active 
                      ? &apos;scale-110&apos; 
                      : isNavigatingToThis 
                      ? &apos;scale-105 opacity-50&apos; 
                      : &apos;&apos;
                  }`} />
                  <span className={`text-xs font-medium transition-all duration-200 ${
                    active 
                      ? &apos;text-blue-600 dark:text-blue-400&apos; 
                      : isNavigatingToThis
                      ? &apos;text-blue-500 dark:text-blue-300 opacity-50&apos;
                      : &apos;&apos;
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Indicateur actif */}
                  {active && (
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                  
                  {/* Loading indicator plus élégant */}
                  {isNavigatingToThis && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}