'use client'

import { motion } from 'framer-motion'

/**
 * Composant StaggerContainer - Animation en cascade pour les enfants
 * Les enfants s'animent l'un après l'autre avec un délai progressif
 */
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  once = false,
  className = ''
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Composant StaggerItem - Élément enfant à utiliser dans StaggerContainer
 */
export const StaggerItem = ({ 
  children, 
  className = '',
  direction = 'up',
  distance = 40
}) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0,
          ...directions[direction]
        },
        visible: { 
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
