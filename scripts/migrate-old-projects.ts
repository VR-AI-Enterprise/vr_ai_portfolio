import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Charger les variables d'environnement depuis .env.production
dotenv.config({ path: '.env.production' });

console.log('🔥 Migration des anciens projets vers Firebase Firestore...');

// Configuration Firebase Admin
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

async function migrateOldProjects() {
  try {
    // Initialiser Firebase Admin
    const app = initializeApp(firebaseAdminConfig);
    const db = getFirestore(app);

    // Charger les anciens projets
    const oldProjects = JSON.parse(readFileSync('./public/data/projects.json', 'utf8'));

    console.log(`📦 Migration de ${oldProjects.length} anciens projets...`);

    // Migrer chaque projet
    for (let i = 0; i < oldProjects.length; i++) {
      const project = oldProjects[i];
      
      console.log(`\n🔄 Migration du projet ${i + 1}/${oldProjects.length}: ${project.title}`);
      
      // Préparer les données pour Firebase
      const firebaseProject = {
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl, // Garder les URLs locales pour l'instant
        platformUrl: project.platformUrl,
        techStack: project.techStack || [],
        isFeatured: i < 3, // Les 3 premiers projets en vedette
        sortOrder: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Ajouter à Firestore
      const docRef = await db.collection('projects').add(firebaseProject);
      console.log(`✅ Projet "${project.title}" migré avec l'ID: ${docRef.id}`);
    }

    console.log('\n🎉 Migration terminée avec succès !');
    console.log(`📊 ${oldProjects.length} projets migrés vers Firebase Firestore`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

migrateOldProjects();