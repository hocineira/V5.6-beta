'use client'

import { motion } from 'framer-motion'

/**
 * Composant ScaleIn - Apparition avec effet de zoom
 * @param {Object} props
 * @param {ReactNode} props.children - Contenu à animer
 * @param {number} props.delay - Délai avant l'animation
 * @param {number} props.duration - Durée de l'animation
 * @param {number} props.scale - Échelle initiale (0.8 = 80%)
 * @param {boolean} props.once - Si true, l'animation ne se joue qu'une fois (défaut: false)
 */
export default function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  scale = 0.8,
  once = false,
  className = ''
}) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: scale
      }}
      whileInView={{ 
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: once, margin: "-100px" }}
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
