'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * FadeIn - Animation d'apparition en fondu
 */
export function FadeIn({ children, delay = 0, duration = 0.6, direction = 'none' }) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScaleIn - Animation d'apparition avec effet de zoom
 */
export function ScaleIn({ children, delay = 0, duration = 0.5, scale = 0.8 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * SlideIn - Animation de glissement
 */
export function SlideIn({ children, delay = 0, duration = 0.6, direction = 'left' }) {
  const directionOffset = {
    left: { x: -60 },
    right: { x: 60 },
    up: { y: 60 },
    down: { y: -60 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * RotateIn - Animation de rotation à l'apparition
 */
export function RotateIn({ children, delay = 0, duration = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer - Conteneur pour animer des éléments en cascade
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
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
 * StaggerItem - Élément enfant pour StaggerContainer
 */
export function StaggerItem({ children, direction = 'up' }) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionOffset[direction] },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedCard - Carte avec animation hover et apparition
 */
export function AnimatedCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * FloatingElement - Élément flottant avec animation continue
 */
export function FloatingElement({ children, delay = 0, duration = 3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * HoverScale - Animation de zoom au survol
 */
export function HoverScale({ children, scale = 1.05, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * CountUp - Animation de compteur
 */
export function CountUp({ from = 0, to, duration = 2, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(from + (to - from) * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <span>{prefix}{count}{suffix}</span>
}

/**
 * RevealText - Animation de révélation de texte
 */
export function RevealText({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * ParallaxElement - Effet parallaxe au scroll
 */
export function ParallaxElement({ children, speed = 0.5 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      style={{ y: `${speed * 100}%` }}
    >
      {children}
    </motion.div>
  )
}

/**
 * PulseElement - Animation de pulsation
 */
export function PulseElement({ children, duration = 2 }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * BouncingElement - Animation de rebond
 */
export function BouncingElement({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay
      }}
    >
      {children}
    </motion.div>
  )
}
