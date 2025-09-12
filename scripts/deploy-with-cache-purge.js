#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');

console.log('🚀 Déploiement avec purge de cache...\n');

try {
  // 1. Build et déploiement
  console.log('📦 Building...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('🚀 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  
  // 2. Attendre que le déploiement soit terminé
  console.log('⏳ Attente du déploiement...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  // 3. Purger le cache
  console.log('🧹 Purge du cache...');
  
  const options = {
    hostname: 'vr-ai-portfolio-qdvik4mk7-emmanuels-projects-fabcf647.vercel.app',
    port: 443,
    path: '/api/projects/purge',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  const req = https.request(options, (res) => {
    console.log(`✅ Cache purgé - Status: ${res.statusCode}`);
    console.log('🎉 Déploiement terminé avec succès!');
  });
  
  req.on('error', (e) => {
    console.log('⚠️  Impossible de purger le cache automatiquement');
    console.log('💡 Vous pouvez le faire manuellement via le dashboard Vercel');
  });
  
  req.end();
  
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}