const sharp = require('sharp');
const path = require('path');

async function optimizeSchema() {
  try {
    console.log('Optimisation de la nouvelle image du schéma réseau...');
    
    // Optimiser l'image en WebP avec une qualité élevée pour conserver la lisibilité du schéma
    await sharp('/app/public/images/mon_schema_reseau_personnel.jpg')
      .resize(1361, 1013, { 
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile('/app/public/images/procedures/optimized_mon_schema_reseau_personnel.webp');
      
    console.log('✅ Image optimisée créée : optimized_mon_schema_reseau_personnel.webp');
    
    // Copier l'image originale vers le dossier procedures
    await sharp('/app/public/images/mon_schema_reseau_personnel.jpg')
      .toFile('/app/public/images/procedures/mon_schema_reseau_personnel.jpg');
      
    console.log('✅ Image originale copiée vers le dossier procedures');
    
    // Vérifier les tailles
    const stats = require('fs').statSync('/app/public/images/procedures/optimized_mon_schema_reseau_personnel.webp');
    console.log(`📊 Taille du fichier WebP optimisé : ${Math.round(stats.size / 1024)} KB`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation :', error);
  }
}

optimizeSchema();