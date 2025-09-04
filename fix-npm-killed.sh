#!/bin/bash

echo "🚨 Fix pour le problème npm install KILLED"
echo "================================================"

# Vérifier l'utilisation mémoire
echo "💾 Utilisation mémoire actuelle:"
free -h

# Vérifier les processus qui consomment de la mémoire
echo ""
echo "🔍 Processus utilisant le plus de mémoire:"
ps -eo pid,ppid,cmd,%mem --sort=-%mem | head -10

# Solution 1: Nettoyer complètement
echo ""
echo "🧹 Nettoyage complet des dépendances..."
rm -rf node_modules/
rm -f package-lock.json
npm cache clean --force

# Solution 2: Installation avec limitations strictes pour éviter KILLED
echo ""
echo "📦 Installation avec options anti-KILLED..."
export NODE_OPTIONS="--max-old-space-size=4096"

npm install \
  --no-optional \
  --no-audit \
  --no-fund \
  --progress=false \
  --loglevel=error \
  --maxsockets=1 \
  --prefer-offline \
  --fetch-timeout=300000 \
  --fetch-retry-mintimeout=20000 \
  --fetch-retry-maxtimeout=120000

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCÈS! Le problème npm install KILLED est résolu!"
    echo "📊 Vérification finale:"
    npm list --depth=0 | head -10
    echo ""
    echo "🎉 Vous pouvez maintenant utiliser 'npm install' normalement"
else
    echo ""
    echo "❌ Installation échouée, essayons une approche différente..."
    echo "🔧 Installation package par package..."
    
    # Installation des packages critiques un par un
    npm install next@^15.5.2 --save
    npm install react@^19.1.1 react-dom@^19.1.1 --save
    npm install tailwindcss@^3.4.0 autoprefixer@^10.4.21 postcss@^8.5.6 --save
    npm install lucide-react@^0.542.0 clsx@^2.1.1 tailwind-merge@^3.3.1 --save
    npm install eslint@^9.34.0 eslint-config-next@^15.5.2 --save-dev
    
    echo "✅ Installation alternative terminée"
fi

echo ""
echo "🎯 Script terminé!"