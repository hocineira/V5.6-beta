&apos;use client&apos;

import { useState, useEffect } from &apos;react&apos;

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsTouch(&apos;ontouchstart&apos; in window)
    }

    checkDevice()
    window.addEventListener(&apos;resize&apos;, checkDevice)
    return () => window.removeEventListener(&apos;resize&apos;, checkDevice)
  }, [])

  return { isMobile, isTablet, isTouch, isDesktop: !isMobile && !isTablet }
}

export function useTouchFeedback() {
  const addRippleEffect = (event) => {
    const button = event.currentTarget
    const ripple = document.createElement(&apos;span&apos;)
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = size + &apos;px&apos;
    ripple.style.left = x + &apos;px&apos;
    ripple.style.top = y + &apos;px&apos;
    ripple.style.position = &apos;absolute&apos;
    ripple.style.borderRadius = &apos;50%&apos;
    ripple.style.backgroundColor = &apos;rgba(255, 255, 255, 0.5)&apos;
    ripple.style.pointerEvents = &apos;none&apos;
    ripple.style.transform = &apos;scale(0)&apos;
    ripple.style.animation = &apos;ripple 0.6s ease-out&apos;
    ripple.style.zIndex = &apos;1&apos;

    button.style.position = &apos;relative&apos;
    button.style.overflow = &apos;hidden&apos;
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  return { addRippleEffect }
}

export function useSwipeGesture(onSwipeLeft, onSwipeRight, threshold = 50) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > threshold
    const isRightSwipe = distance < -threshold

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}