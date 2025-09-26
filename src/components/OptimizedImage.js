&apos;use client&apos;

import Image from &apos;next/image&apos;
import { useState } from &apos;react&apos;

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false, 
  quality = 75,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  
  // Créer la version WebP optimisée du src
  const getOptimizedSrc = (originalSrc) => {
    // Si c&apos;est déjà une image optimisée, on la retourne
    if (originalSrc.includes(&apos;optimized_&apos;)) {
      return originalSrc
    }
    
    // Sinon on crée le chemin vers la version optimisée
    const pathParts = originalSrc.split(&apos;/&apos;)
    const fileName = pathParts[pathParts.length - 1]
    const baseName = fileName.replace(/\.(jpg|jpeg|png)$/i, &apos;&apos;)
    pathParts[pathParts.length - 1] = `optimized_${baseName}.webp`
    
    return pathParts.join(&apos;/&apos;)
  }

  const optimizedSrc = getOptimizedSrc(src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? &apos;opacity-0&apos; : &apos;opacity-100&apos;
        }`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage