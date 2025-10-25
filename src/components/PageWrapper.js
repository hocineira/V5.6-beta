'use client'

import { usePathname } from 'next/navigation'

/**
 * PageWrapper - Simple wrapper sans animations de transition
 * Les animations de transition entre pages ont été supprimées
 */
export default function PageWrapper({ children }) {
  const pathname = usePathname()

  return (
    <div key={pathname}>
      {children}
    </div>
  )
}
