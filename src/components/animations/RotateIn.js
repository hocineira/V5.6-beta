'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant RotateIn - Apparition avec rotation dynamique
 * Parfait pour les badges, icônes, et éléments accrocheurs
 * Se déclenche au montage de la page ET au scroll
 */
export default function RotateIn({ 
  children, 
  delay = 0,
  duration = 0.7,
  rotate = 180,
  triggerOnMount = true,
  className = ''
}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (triggerOnMount) {
      setIsInView(true)
    }
  }, [triggerOnMount])

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        rotate: rotate,
        scale: 0.5
      }}
      animate={isInView ? { 
        opacity: 1,
        rotate: 0,
        scale: 1
      } : undefined}
      whileInView={{ 
        opacity: 1,
        rotate: 0,
        scale: 1
      }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ margin: "-100px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1] // Bounce effect
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
