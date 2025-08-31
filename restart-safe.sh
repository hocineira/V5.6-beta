#!/bin/bash

# Script de redémarrage sécurisé de l'application
# Usage: ./restart-safe.sh

echo "🔄 Redémarrage sécurisé de l'application..."

# Arrêter les processus existants
echo "⏹️ Arrêt des processus existants..."
pkill -f "npm start" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

# Attendre un peu
sleep 2

# Vérifier que les processus sont bien arrêtés
if pgrep -f "npm start" >/dev/null; then
    echo "⚠️ Forçage de l'arrêt..."
    pkill -9 -f "npm start" 2>/dev/null || true
    sleep 2
fi

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    
    # Démarrer en arrière-plan
    echo "🚀 Démarrage de l'application..."
    nohup npm start > app.log 2>&1 &
    
    # Attendre que l'application démarre
    sleep 5
    
    # Vérifier que l'application fonctionne
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "30[0-9]"; then
        echo "✅ Application démarrée avec succès sur http://localhost:3000"
        echo "📝 Logs disponibles dans app.log"
    else
        echo "❌ Erreur: L'application ne répond pas"
        echo "📝 Vérifiez les logs dans app.log"
        exit 1
    fi
else
    echo "❌ Erreur lors du build"
    exit 1
fi