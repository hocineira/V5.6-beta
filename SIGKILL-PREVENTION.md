# Prévention des Erreurs SIGKILL

## 🔍 Problème
L'erreur "Next.js build worker exited with code: null and signal: SIGKILL" est causée par un manque de mémoire (OOM - Out Of Memory).

## ✅ Solutions Appliquées

### 1. Limitation de la Mémoire Node.js
**Fichier:** `.env.local`
```bash
NODE_OPTIONS=--max-old-space-size=2048
```
Cette variable limite la mémoire utilisée par Node.js à 2GB, évitant les pics de consommation.

### 2. Configuration Next.js Optimisée
**Fichier:** `next.config.js`
```javascript
experimental: {
  optimizePackageImports: ['lucide-react'],
  workerThreads: false,  // Désactive les workers threads
  cpus: 1,                // Limite à 1 CPU
}
```

### 3. Configuration Supervisor
**Fichier:** `/etc/supervisor/conf.d/supervisord.conf`
```ini
[program:frontend]
command=yarn dev
environment=HOST="0.0.0.0",PORT="3000",NODE_OPTIONS="--max-old-space-size=2048"
```

## 📊 Monitoring

### Vérifier l'utilisation mémoire
```bash
# Mémoire totale disponible
free -h

# Mémoire utilisée par Next.js
ps aux | grep "next dev" | head -1

# Logs OOM dans le système
dmesg | grep -i "oom\|killed"
```

### Vérifier les logs
```bash
# Logs du serveur de développement
tail -f /var/log/supervisor/frontend.err.log

# Rechercher les SIGKILL
grep -i "sigkill" /var/log/supervisor/frontend.err.log
```

## 🛠️ Si le Problème Persiste

### Option 1: Réduire encore la mémoire
```bash
# Dans .env.local, réduire à 1.5GB
NODE_OPTIONS=--max-old-space-size=1536
```

### Option 2: Utiliser le mode production
Au lieu de `yarn dev`, utiliser:
```bash
yarn build && yarn start
```
Le mode production consomme moins de mémoire car il n'inclut pas le hot-reload.

### Option 3: Désactiver le SWC minifier
Dans `next.config.js`:
```javascript
swcMinify: false,  // Utilise Terser au lieu de SWC
```

## 🎯 Build Réussi
- ✅ Build time: ~17-20 secondes
- ✅ 31 routes générées
- ✅ Taille optimale des bundles
- ✅ Pas de SIGKILL détecté

## 📝 Notes
- Le serveur dev Next.js redémarre automatiquement en cas de crash
- Supervisor relance le processus si nécessaire
- Les fichiers `.next/` peuvent être supprimés pour un build propre: `rm -rf .next/`
