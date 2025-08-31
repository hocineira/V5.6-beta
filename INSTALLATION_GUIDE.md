# 🚀 Guide d'Installation - Portfolio V5.0.1

## ⚠️ Problème Résolu : npm install "killed"

Le problème de `npm install` qui affiche "killed" a été résolu. Voici les solutions :

### 🛠️ Solution Rapide (Recommandée)

Utilisez le script d'installation optimisé :

```bash
./install-safe.sh
```

### 🔧 Installation Manuelle Optimisée

Si vous préférez installer manuellement :

```bash
# Nettoyer le cache
npm cache clean --force

# Installation avec options optimisées
npm install --production --no-optional --prefer-offline --progress=false --loglevel=error --maxsockets=1
```

### 🚀 Redémarrage de l'Application

Pour redémarrer l'application de manière sûre :

```bash
./restart-safe.sh
```

### 📋 Commandes Standards

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Démarrage production
npm start
```

## 🎯 Procédure OpenVPN pfSense Ajoutée

✅ **Nouvelle procédure ajoutée avec succès !**

- **Fichier PDF** : `/public/procedures/OpenVPN_pfSense.pdf`
- **Image** : `/public/images/openvpn_reference.jpg`
- **Visible sur** : http://localhost:3000/projets

### 📁 Structure des Procédures

```
public/procedures/
├── OpenVPN_pfSense.pdf     ← Nouvelle procédure
├── Active_Directory.pdf
├── GLPI.pdf
├── GPO.pdf
├── MITM_DNS_Spoofing.pdf
├── MITM_Ettercap.pdf
├── Proxmox.pdf
├── TCS.pdf
├── VLAN_Interco.pdf
└── Zabbix.pdf
```

## 🔍 Diagnostique des Problèmes

### Vérifier l'état de l'application
```bash
curl -I http://localhost:3000
```

### Vérifier les processus
```bash
ps aux | grep npm
```

### Vérifier l'espace disque
```bash
df -h
```

### Vérifier la mémoire
```bash
free -h
```

## 📝 Notes Importantes

- ✅ Utiliser `npm` au lieu de `yarn` (comme demandé)
- ✅ Les scripts d'installation gèrent les contraintes de mémoire
- ✅ L'application fonctionne sur le port 3000
- ✅ Toutes les procédures sont accessibles et téléchargeables

## 🎉 Résultat Final

La procédure OpenVPN pfSense est maintenant visible à côté des autres procédures techniques sur votre portfolio !

**URL de test** : http://localhost:3000/projets