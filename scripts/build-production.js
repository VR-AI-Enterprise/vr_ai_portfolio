#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for production...');

try {
  // 1. Générer le client Prisma
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // 2. Build Next.js
  console.log('🏗️ Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Vérifier que le build est réussi
  if (fs.existsSync('.next')) {
    console.log('✅ Build successful!');
    console.log('📁 Output directory: .next');
  } else {
    throw new Error('Build failed - .next directory not found');
  }

  console.log('🎉 Production build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}