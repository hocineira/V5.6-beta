'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant ScaleIn - Apparition avec effet de zoom
 * Se déclenche au montage de la page ET au scroll
 * @param {Object} props
 * @param {ReactNode} props.children - Contenu à animer
 * @param {number} props.delay - Délai avant l'animation
 * @param {number} props.duration - Durée de l'animation
 * @param {number} props.scale - Échelle initiale (0.8 = 80%)
 * @param {boolean} props.triggerOnMount - Si true, se déclenche au montage (défaut: true)
 */
export default function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  scale = 0.8,
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
        scale: scale
      }}
      animate={isInView ? { 
        opacity: 1,
        scale: 1
      } : undefined}
      whileInView={{ 
        opacity: 1,
        scale: 1
      }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ margin: "-100px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1] // Effet bounce
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
