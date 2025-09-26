&apos;use client&apos;

import React, { createContext, useContext, useEffect, useState } from &apos;react&apos;

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Flag pour activer/désactiver le mode sombre
  const isDarkModeEnabled = process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === &apos;true&apos;

  // Initialiser le thème au montage du composant
  useEffect(() => {
    // Si le mode sombre est désactivé, forcer le mode clair
    if (!isDarkModeEnabled) {
      setIsDark(false)
      document.documentElement.classList.remove(&apos;dark&apos;)
      setMounted(true)
      return
    }

    // Récupérer la préférence sauvegardée - MODE CLAIR PAR DÉFAUT
    const savedTheme = localStorage.getItem(&apos;theme&apos;)

    if (savedTheme === &apos;dark&apos;) {
      setIsDark(true)
      document.documentElement.classList.add(&apos;dark&apos;)
    } else {
      // Mode clair par défaut - même si pas de préférence sauvegardée
      setIsDark(false)
      document.documentElement.classList.remove(&apos;dark&apos;)
    }
    
    setMounted(true)
  }, [isDarkModeEnabled])

  // Écouter les changements de préférence système
  useEffect(() => {
    if (!mounted || !isDarkModeEnabled) return

    const mediaQuery = window.matchMedia(&apos;(prefers-color-scheme: dark)&apos;)
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem(&apos;theme&apos;)
      // Seulement changer si aucune préférence n&apos;est sauvegardée
      if (!savedTheme) {
        setIsDark(e.matches)
        if (e.matches) {
          document.documentElement.classList.add(&apos;dark&apos;)
        } else {
          document.documentElement.classList.remove(&apos;dark&apos;)
        }
      }
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [mounted, isDarkModeEnabled])

  const toggleTheme = () => {
    // Ne pas permettre le basculement si le mode sombre est désactivé
    if (!isDarkModeEnabled) return
    
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add(&apos;dark&apos;)
      localStorage.setItem(&apos;theme&apos;, &apos;dark&apos;)
    } else {
      document.documentElement.classList.remove(&apos;dark&apos;)
      localStorage.setItem(&apos;theme&apos;, &apos;light&apos;)
    }
  }

  const value = {
    isDark: isDarkModeEnabled ? isDark : false, // Force false si désactivé
    toggleTheme,
    mounted,
    isDarkModeEnabled // Exposer le flag pour les composants qui en ont besoin
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(&apos;useTheme must be used within a ThemeProvider&apos;)
  }
  return context
}