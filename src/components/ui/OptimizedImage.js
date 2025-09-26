&apos;use client&apos;

import { useState } from &apos;react&apos;
import Image from &apos;next/image&apos;

export default function OptimizedImage({ 
  src, 
  alt, 
  className = &apos;&apos;, 
  priority = false,
  sizes = &apos;(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw&apos;,
  placeholder = &apos;blur&apos;,
  blurDataURL,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Génère un blur placeholder simple pour de meilleures performances
  const generateBlurDataURL = () => {
    return &apos;data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==&apos;
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  // Si erreur de chargement, affiche un placeholder
  if (error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Image non disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || generateBlurDataURL()}
        onLoad={handleLoad}
        onError={handleError}
        className={`object-cover transition-opacity duration-300 ${isLoading ? &apos;opacity-0&apos; : &apos;opacity-100&apos;}`}
        quality={75} // Réduit la qualité pour de meilleures performances mobile
        {...props}
      />
    </div>
  )
}