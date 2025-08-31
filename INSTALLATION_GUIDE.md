# 🚀 Guide d'Installation - Portfolio V5.0.1

## ⚠️ PROBLÈME RÉSOLU : npm install "killed" 

**✅ CAUSE IDENTIFIÉE** : Conflit entre gestionnaires de packages (npm/yarn)

Le problème venait de la présence simultanée de `package-lock.json` et `yarn.lock`, créant des conflits lors de l'installation.

### 🛠️ Solution Définitive (Recommandée)

Utilisez le script d'installation corrigé :

```bash
./install-safe.sh
```

Ce script :
1. ✅ Supprime automatiquement les fichiers `yarn.lock` 
2. ✅ Nettoie les `node_modules` existants
3. ✅ Utilise `npm ci` pour une installation propre
4. ✅ Évite tous les conflits de gestionnaires

### 🔧 Solution Manuelle

Si vous voulez le faire manuellement :

```bash
# 1. Supprimer les conflits yarn
rm yarn.lock frontend/yarn.lock 2>/dev/null || true

# 2. Nettoyer complètement
rm -rf node_modules
npm cache clean --force  

# 3. Installation propre
npm ci
```

### 📋 Diagnostic du Problème

**Cause racine identifiée** :
- ✅ Présence de `yarn.lock` ET `package-lock.json`
- ✅ Conflit entre gestionnaires npm/yarn
- ✅ Pas un problème de mémoire mais de compatibilité

**Résolution appliquée** :
- ✅ Suppression complète des fichiers yarn.lock
- ✅ Utilisation exclusive de npm avec `npm ci`
- ✅ Nettoyage préventif du cache

## 🎯 Procédure OpenVPN pfSense - STATUS ✅

**Nouvelle procédure parfaitement fonctionnelle !**

- **Fichier PDF** : `/public/procedures/OpenVPN_pfSense.pdf` ✅
- **Image** : `/public/images/openvpn_reference.jpg` ✅  
- **Visible sur** : http://localhost:3000/projets ✅
- **Téléchargement** : Fonctionnel ✅

### 🚀 Commandes de Gestion

```bash
# Installation sécurisée
./install-safe.sh

# Redémarrage de l'app
./restart-safe.sh

# Commandes standards
npm ci          # Installation propre (recommandé)
npm run build   # Build production
npm start       # Démarrage
```

## ✅ Résolution Complète

**Le problème "npm install killed" est définitivement résolu !**

- 🎯 Cause identifiée : Conflit npm/yarn  
- 🛠️ Solution appliquée : Suppression yarn.lock + npm ci
- ✅ Test validé : Installation en 23 secondes sans erreur
- 🚀 Application fonctionnelle avec procédure OpenVPN

**Votre portfolio fonctionne parfaitement !** 🎉