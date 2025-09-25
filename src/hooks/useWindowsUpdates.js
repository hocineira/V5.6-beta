'use client'

import { useState, useEffect } from 'react'

// Utilise les API routes Next.js intégrées
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : ''

export function useWindowsUpdates(category = null, limit = 50) {
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  const fetchUpdates = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      params.append('limit', limit.toString())
      
      const response = await fetch(`${API_BASE_URL}/api/windows/updates?${params}`)
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }
      
      const data = await response.json()
      setUpdates(data.updates || [])
      
    } catch (err) {
      console.error('Erreur récupération updates:', err)
      setError(err.message)
      // Fallback avec données par défaut
      setUpdates(getDefaultUpdates())
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/windows/updates/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (err) {
      console.error('Erreur récupération stats:', err)
    }
  }

  const refreshUpdates = async () => {
    try {
      // Déclenche la mise à jour RSS
      await fetch(`${API_BASE_URL}/api/windows/updates/refresh`, {
        method: 'POST'
      })
      
      // Attend un peu puis rafraîchit les données
      setTimeout(() => {
        fetchUpdates()
        fetchStats()
      }, 5000)
      
      return true
    } catch (err) {
      console.error('Erreur refresh:', err)
      return false
    }
  }

  useEffect(() => {
    fetchUpdates()
    fetchStats()
  }, [category, limit])

  return {
    updates,
    loading,
    error,
    stats,
    refreshUpdates,
    refetch: fetchUpdates
  }
}

// Données de fallback si l'API n'est pas disponible
function getDefaultUpdates() {
  return [
    {
      id: '1',
      title: 'Windows 11 24H2',
      description: 'La dernière mise à jour majeure de Windows 11 apportant de nouvelles fonctionnalités de sécurité et de productivité.',
      link: 'https://blogs.windows.com/windows-insider/2024/10/01/windows-11-24h2/',
      published_date: '2024-10-01T00:00:00Z',
      category: 'feature',
      version: 'Windows 11 24H2',
      kb_number: null,
      severity: null,
      tags: ['feature'],
      source: 'windows_blog',
      features: [
        'Nouvelles options de sécurité avancées',
        'Interface utilisateur améliorée', 
        'Copilot intégré nativement',
        'Performances optimisées pour l\'IA',
        'Gestion améliorée de la batterie'
      ],
      support: 'Jusqu\'en octobre 2029',
      status: 'Stable'
    },
    {
      id: '2',
      title: 'Windows Server 2025',
      description: 'La nouvelle version de Windows Server avec des fonctionnalités cloud natives et une sécurité renforcée.',
      link: 'https://www.microsoft.com/windows-server/2025/',
      published_date: '2024-11-01T00:00:00Z',
      category: 'server',
      version: 'Windows Server 2025',
      kb_number: null,
      severity: null,
      tags: ['server'],
      source: 'windows_server',
      features: [
        'Containers Windows améliorés',
        'Sécurité Zero Trust native',
        'Azure Arc intégré par défaut',
        'Gestion hybride avancée',
        'Support Kubernetes natif'
      ],
      support: 'Support étendu jusqu\'en 2034',
      status: 'Stable'
    }
  ]
}

export function useLatestUpdates(limit = 10) {
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/windows/updates/latest?limit=${limit}`)
        
        if (response.ok) {
          const data = await response.json()
          setUpdates(data.updates || [])
        } else {
          setUpdates(getDefaultUpdates().slice(0, limit))
        }
      } catch (err) {
        console.error('Erreur:', err)
        setError(err.message)
        setUpdates(getDefaultUpdates().slice(0, limit))
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [limit])

  return { updates, loading, error }
}