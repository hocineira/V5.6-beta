'use client'

import { motion } from 'framer-motion'

/**
 * Composant AnimatedCard - Carte avec animations hover dynamiques
 * Effets: scale, rotation subtile, shadow dynamique
 */
export default function AnimatedCard({ 
  children, 
  delay = 0,
  className = '',
  hoverScale = 1.05,
  hoverRotate = 2,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      whileHover={{ 
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
