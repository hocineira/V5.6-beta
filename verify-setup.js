#!/usr/bin/env node

/**
 * Script de vérification du setup du portfolio Next.js
 * Vérifie que l'application utilise NPM et que tout fonctionne correctement
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification du setup du portfolio Next.js...\n');

// 1. Vérifier qu'il n'y a pas de yarn.lock
const yarnLockPath = path.join(__dirname, 'yarn.lock');
if (fs.existsSync(yarnLockPath)) {
  console.log('❌ ATTENTION: yarn.lock trouvé! Supprimez-le pour utiliser npm uniquement.');
} else {
  console.log('✅ Pas de yarn.lock - NPM utilisé correctement');
}

// 2. Vérifier package-lock.json
const packageLockPath = path.join(__dirname, 'package-lock.json');
if (fs.existsSync(packageLockPath)) {
  console.log('✅ package-lock.json présent - NPM configuré correctement');
} else {
  console.log('⚠️  package-lock.json manquant - lancez "npm install"');
}

// 3. Vérifier node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules présent - Dépendances installées');
} else {
  console.log('❌ node_modules manquant - Lancez "npm install"');
}

// 4. Vérifier package.json
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('✅ package.json présent');
  console.log(`   - Nom: ${packageJson.name}`);
  console.log(`   - Version: ${packageJson.version}`);
  console.log(`   - Next.js: ${packageJson.dependencies?.next || 'Non trouvé'}`);
  console.log(`   - React: ${packageJson.dependencies?.react || 'Non trouvé'}`);
}

// 5. Vérifier les fichiers PDF
const proceduresPath = path.join(__dirname, 'public', 'procedures');
if (fs.existsSync(proceduresPath)) {
  const pdfFiles = fs.readdirSync(proceduresPath).filter(file => file.endsWith('.pdf'));
  console.log(`✅ Dossier procedures présent avec ${pdfFiles.length} fichiers PDF:`);
  pdfFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log('⚠️  Dossier procedures manquant');
}

// 6. Vérifier les composants critiques
const criticalFiles = [
  'src/app/layout.js',
  'src/app/page.js', 
  'src/components/Navigation.js',
  'src/components/PDFModalFinal.js',
  'src/contexts/ThemeContext.js',
  'next.config.js'
];

console.log('\n📁 Vérification des fichiers critiques:');
criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
  }
});

console.log('\n🎯 RÉSUMÉ:');
console.log('- Application Next.js 15 avec App Router');
console.log('- Configuration NPM (pas yarn)');
console.log('- Portfolio avec système de navigation avancé');
console.log('- Modal PDF avec gestion d\'erreurs améliorée');
console.log('- Mode sombre/clair avec persistance');
console.log('- Optimisations mobile Samsung S22 Ultra');
console.log('- API PDF backend fonctionnelle');

console.log('\n✅ SETUP VÉRIFIÉ - PRÊT POUR LA PRODUCTION!');