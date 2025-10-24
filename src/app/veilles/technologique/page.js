'use client';

import { useState, useEffect } from 'react';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard, RotateIn } from '../../../components/animations';

export default function VeilleTechnologique() {
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données de fallback en cas d'erreur
  const fallbackUpdates = [
    {
      id: '1',
      title: 'Windows Server 2025 - Disponibilité Générale',
      description: 'Microsoft annonce la disponibilité générale de Windows Server 2025 avec des fonctionnalités avancées de sécurité, des performances améliorées et une agilité cloud renforcée.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2024/11/04/windows-server-2025-now-generally-available-with-advanced-security-improved-performance-and-cloud-agility/',
      published_date: '2024-11-04T15:30:00.000Z',
      category: 'server',
      version: 'Windows Server 2025',
      source: 'Microsoft Windows Server Blog',
      tags: ['server', 'feature']
    },
    {
      id: '2',
      title: 'Hotpatching pour Windows Server - Fini les redémarrages !',
      description: 'Le hotpatching pour Windows Server 2025 devient disponible en tant que service par abonnement, éliminant le besoin de redémarrages fréquents pour les mises à jour de sécurité.',
      link: 'https://www.microsoft.com/en-us/windows-server/blog/2025/04/24/tired-of-all-the-restarts-get-hotpatching-for-windows-server/',
      published_date: '2025-04-24T15:00:00.000Z',
      category: 'server',
      version: 'Windows Server 2025',
      source: 'Microsoft Windows Server Blog',
      tags: ['server', 'security']
    }
  ];

  const categories = [
    { key: 'all', label: 'Tous', icon: '📊' },
    { key: 'particuliers', label: 'Particuliers', icon: '💻' },
    { key: 'serveur', label: 'Serveur', icon: '🖥️' },
    { key: 'security', label: 'Sécurité', icon: '🔒' },
    { key: 'entreprise', label: 'Entreprise', icon: '🏢' },
    { key: 'iot', label: 'IoT', icon: '🌐' }
  ];

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setError(null);
      const response = await fetch('/api/windows/updates?limit=20');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.updates && data.updates.length > 0) {
        setUpdates(data.updates);
        setStats({ total: data.total });
      } else {
        // Utiliser les données de fallback si aucune donnée n'est disponible
        setUpdates(fallbackUpdates);
        setStats({ total: fallbackUpdates.length });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError(error.message);
      // Utiliser les données de fallback en cas d'erreur
      setUpdates(fallbackUpdates);
      setStats({ total: fallbackUpdates.length });
    } finally {
      setLoading(false);
    }
  };

  const refreshRSS = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/windows/updates/refresh', {
        method: 'POST'
      });
      
      if (response.ok) {
        await fetchUpdates();
      } else {
        throw new Error('Erreur lors du refresh RSS');
      }
    } catch (error) {
      console.error('Erreur refresh RSS:', error);
      setError('Erreur lors du rafraîchissement des données RSS');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const categoryMap = {
      'particuliers': '💻',
      'serveur': '🖥️',
      'security': '🔒',
      'entreprise': '🏢',
      'iot': '🌐',
      'feature': '⭐'
    };
    return categoryMap[category] || '📄';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'Important': 'bg-orange-100 text-orange-800 border-orange-200',
      'Moderate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de la veille technologique...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <section className="relative overflow-hidden py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4">
          <a href="/veilles" className="inline-block mb-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour aux veilles</span>
            </button>
          </a>

          <div className="text-center text-white">
            <ScaleIn delay={0.2} scale={0.6}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="20" height="14" x="2" y="3" rx="2"/>
                    <line x1="8" x2="16" y1="21" y2="21"/>
                    <line x1="12" x2="12" y1="17" y2="21"/>
                  </svg>
                </div>
              </div>
            </ScaleIn>

            <FadeIn delay={0.4} direction="up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Veille Technologique Windows
              </h1>
            </FadeIn>
            <FadeIn delay={0.6} direction="up">
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Veille technologique française spécialisée Windows : particuliers, serveur, entreprise, IoT, sécurité. Sources françaises de référence pour une expertise complète.
              </p>
            </FadeIn>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
                <span className="text-2xl font-bold">{stats.total}</span>
                <span className="text-blue-100">articles</span>
              </div>
              
              <button
                onClick={refreshRSS}
                disabled={refreshing}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-full px-6 py-3 flex items-center space-x-2 transition-colors"
              >
                <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{refreshing ? 'Actualisation...' : 'Actualiser RSS'}</span>
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-300 text-red-100 px-4 py-2 rounded-lg max-w-md mx-auto">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-700 hover:bg-blue-50 shadow-sm hover:shadow-md'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {category.key === 'all' ? stats.total : updates.filter(u => u.category === category.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <StaggerContainer staggerDelay={0.08} className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUpdates.map((update, index) => (
              <StaggerItem key={update.id}>
                <AnimatedCard delay={index * 0.05} hoverScale={1.03} hoverRotate={1}>
                  <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 h-full"
                  >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                        {getCategoryIcon(update.category)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                            ✓ Microsoft
                          </span>
                          {update.severity && (
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getSeverityColor(update.severity)}`}>
                              {update.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(update.published_date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                    {update.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {update.description}
                  </p>

                  {/* Tags and Version */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {update.version && (
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                        {update.version}
                      </span>
                    )}
                    {update.kb_number && (
                      <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">
                        {update.kb_number}
                      </span>
                    )}
                    {update.tags && update.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-50 text-slate-600 text-xs font-medium px-3 py-1 rounded-full border border-slate-200 capitalize">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Source:</span>
                      <span className="font-semibold text-slate-900 text-right">{update.source}</span>
                    </div>
                  </div>
                  
                  {update.link && (
                    <a 
                      href={update.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                      <span className="font-medium">Lire l'article complet</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  </div>
                </article>
              </AnimatedCard>
            </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredUpdates.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun article trouvé</h3>
              <p className="text-slate-600">Aucun article n'est disponible pour cette catégorie actuellement.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Système de Veille Automatisée</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Surveillance continue des écosystèmes Microsoft professionnels avec récupération automatique depuis 
              les flux RSS officiels, traduction intelligente et classification par domaine d'expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Flux RSS Automatisés</h3>
              <p className="text-sm text-slate-600">
                Récupération depuis 7+ sources officielles Microsoft
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Traduction Intelligente</h3>
              <p className="text-sm text-slate-600">
                Traduction contextuelle des contenus techniques
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Temps Réel</h3>
              <p className="text-sm text-slate-600">
                Mise à jour continue des dernières innovations
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Focus Professionnel</h3>
              <p className="text-sm text-slate-600">
                Contenu ciblé entreprise et infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Besoin d'expertise Microsoft ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Conseil, migration, implémentation et support sur les technologies Microsoft. 
            Restons connectés pour discuter de vos projets d'infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
              <span>Me contacter</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <a href="/veilles">
              <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour aux veilles</span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}