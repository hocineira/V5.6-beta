'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant AnimatedCard - Carte avec animations hover dynamiques
 * Effets: scale, rotation subtile, shadow dynamique
 * Se déclenche au montage de la page ET au scroll
 */
export default function AnimatedCard({ 
  children, 
  delay = 0,
  triggerOnMount = true,
  className = '',
  hoverScale = 1.05,
  hoverRotate = 2,
  ...props
}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (triggerOnMount) {
      setIsInView(true)
    }
  }, [triggerOnMount])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ margin: "-50px" }}
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
