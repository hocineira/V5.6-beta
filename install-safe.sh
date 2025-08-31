#!/bin/bash

# Script d'installation optimisé pour éviter les conflits npm/yarn
# Usage: ./install-safe.sh

echo "🚀 Installation optimisée des dépendances..."

# ÉTAPE 1: Résoudre les conflits de gestionnaires de packages
echo "🔍 Vérification des conflits npm/yarn..."
if [ -f "yarn.lock" ]; then
    echo "⚠️  Suppression de yarn.lock pour éviter les conflits..."
    rm yarn.lock
fi

if [ -f "frontend/yarn.lock" ]; then
    echo "⚠️  Suppression de frontend/yarn.lock..."
    rm frontend/yarn.lock
fi

# ÉTAPE 2: Nettoyer les anciens node_modules
if [ -d "node_modules" ]; then
    echo "📦 Nettoyage des anciens node_modules..."
    rm -rf node_modules
fi

# ÉTAPE 3: Nettoyer le cache npm  
echo "🧹 Nettoyage du cache npm..."
npm cache clean --force

# ÉTAPE 4: Installation propre avec npm ci (recommandé)
echo "⚡ Installation avec npm ci (installation propre)..."
npm ci

if [ $? -eq 0 ]; then
    echo "✅ Installation réussie avec npm ci !"
    echo "📊 Taille du dossier node_modules:"
    du -sh node_modules/ 2>/dev/null || echo "N/A"
    echo "📋 Nombre de packages installés:"
    ls node_modules/ 2>/dev/null | wc -l || echo "N/A"
    echo "🎯 Problème npm install 'killed' résolu !"
else
    echo "❌ Erreur avec npm ci, essai avec npm install optimisé..."
    npm install \
        --no-optional \
        --prefer-offline \
        --progress=false \
        --loglevel=error \
        --maxsockets=1
fi