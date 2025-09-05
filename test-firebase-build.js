#!/usr/bin/env node

// Script de test pour vérifier que le build fonctionne sans Firebase
// Usage: node test-firebase-build.js

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Test du build sans configuration Firebase...');

try {
  // Créer un fichier .env temporaire avec des valeurs factices
  const tempEnvContent = `
# Configuration Firebase temporaire pour le test
NEXT_PUBLIC_FIREBASE_API_KEY=test_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

FIREBASE_PROJECT_ID=test-project
FIREBASE_CLIENT_EMAIL=test@test-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\ntest_key\\n-----END PRIVATE KEY-----\\n"
`;

  // Sauvegarder l'ancien .env.local s'il existe
  if (fs.existsSync('.env.local')) {
    fs.copyFileSync('.env.local', '.env.local.backup');
    console.log('✅ Ancien .env.local sauvegardé');
  }

  // Créer le fichier .env.local temporaire
  fs.writeFileSync('.env.local', tempEnvContent);
  console.log('✅ Fichier .env.local temporaire créé');

  // Tester le build
  console.log('🏗️ Test du build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build réussi ! La configuration Firebase est correcte.');

} catch (error) {
  console.error('❌ Erreur lors du test:', error.message);
  process.exit(1);
} finally {
  // Restaurer l'ancien .env.local
  if (fs.existsSync('.env.local.backup')) {
    fs.copyFileSync('.env.local.backup', '.env.local');
    fs.unlinkSync('.env.local.backup');
    console.log('✅ Ancien .env.local restauré');
  } else {
    fs.unlinkSync('.env.local');
    console.log('✅ Fichier .env.local temporaire supprimé');
  }
}

console.log('🎉 Test terminé !');