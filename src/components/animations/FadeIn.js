'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant FadeIn - Apparition en fondu avec mouvement vertical
 * Se déclenche au montage de la page ET au scroll
 * @param {Object} props
 * @param {ReactNode} props.children - Contenu à animer
 * @param {number} props.delay - Délai avant l'animation (en secondes)
 * @param {number} props.duration - Durée de l'animation (en secondes)
 * @param {string} props.direction - Direction: 'up', 'down', 'left', 'right'
 * @param {number} props.distance - Distance de déplacement en pixels
 * @param {boolean} props.triggerOnMount - Si true, se déclenche au montage (défaut: true)
 */
export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  distance = 30,
  triggerOnMount = true,
  className = ''
}) {
  const [isInView, setIsInView] = useState(false)
  
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  // Force l'animation au montage si triggerOnMount est true
  useEffect(() => {
    if (triggerOnMount) {
      setIsInView(true)
    }
  }, [triggerOnMount])

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1,
        x: 0,
        y: 0
      } : undefined}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ margin: "-100px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
