'use client'

import { motion } from 'framer-motion'

/**
 * Composant FloatingElement - Élément flottant avec mouvement perpétuel
 * Effet de lévitation moderne et dynamique
 */
export default function FloatingElement({ 
  children, 
  duration = 3,
  distance = 20,
  className = ''
}) {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
