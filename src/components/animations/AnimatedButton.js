'use client'

import { motion } from 'framer-motion'

/**
 * Composant AnimatedButton - Bouton avec animations dynamiques
 * Effets hover: scale, rotation, glow
 */
export default function AnimatedButton({ 
  children, 
  onClick,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'outline'
  ...props
}) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.08,
        rotate: [0, -2, 2, -2, 0],
        transition: { 
          rotate: {
            duration: 0.5,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.2
          }
        }
      }}
      whileTap={{ 
        scale: 0.95,
        rotate: 0
      }}
      onClick={onClick}
      className={className}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        className="flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
