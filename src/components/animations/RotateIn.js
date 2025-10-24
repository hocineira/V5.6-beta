'use client'

import { motion } from 'framer-motion'

/**
 * Composant RotateIn - Apparition avec rotation dynamique
 * Parfait pour les badges, icônes, et éléments accrocheurs
 */
export default function RotateIn({ 
  children, 
  delay = 0,
  duration = 0.7,
  rotate = 180,
  className = ''
}) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        rotate: rotate,
        scale: 0.5
      }}
      whileInView={{ 
        opacity: 1,
        rotate: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
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
