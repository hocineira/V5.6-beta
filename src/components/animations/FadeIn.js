'use client'

import { motion } from 'framer-motion'

/**
 * Composant FadeIn - Apparition en fondu avec mouvement vertical
 * @param {Object} props
 * @param {ReactNode} props.children - Contenu à animer
 * @param {number} props.delay - Délai avant l'animation (en secondes)
 * @param {number} props.duration - Durée de l'animation (en secondes)
 * @param {string} props.direction - Direction: 'up', 'down', 'left', 'right'
 * @param {number} props.distance - Distance de déplacement en pixels
 * @param {boolean} props.once - Si true, l'animation ne se joue qu'une fois (défaut: false)
 */
export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  distance = 30,
  once = false,
  className = ''
}) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: once, margin: "-100px" }}
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
