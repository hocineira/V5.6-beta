#!/bin/bash

# Script d'installation optimisé pour éviter les problèmes de mémoire
# Usage: ./install-safe.sh

echo "🚀 Installation optimisée des dépendances..."

# Nettoyer les anciens node_modules si nécessaire
if [ -d "node_modules" ]; then
    echo "📦 Nettoyage des anciens node_modules..."
    rm -rf node_modules
fi

# Nettoyer le cache npm
echo "🧹 Nettoyage du cache npm..."
npm cache clean --force

# Installation avec options optimisées pour la mémoire
echo "⚡ Installation des dépendances avec options optimisées..."
npm install \
    --production \
    --no-optional \
    --prefer-offline \
    --progress=false \
    --loglevel=error \
    --maxsockets=1 \
    --prefer-dedupe

if [ $? -eq 0 ]; then
    echo "✅ Installation réussie !"
    echo "📊 Taille du dossier node_modules:"
    du -sh node_modules/ 2>/dev/null || echo "N/A"
    echo "📋 Nombre de packages installés:"
    ls node_modules/ 2>/dev/null | wc -l || echo "N/A"
else
    echo "❌ Erreur lors de l'installation"
    exit 1
fi