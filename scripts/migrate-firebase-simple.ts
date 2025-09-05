import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Charger les variables d'environnement depuis .env
dotenv.config({ path: '.env' });

console.log('🔥 Début de la migration vers Firebase Firestore...');

// Configuration Firebase Admin
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
};

async function migrateToFirebase() {
  try {
    // Initialiser Firebase Admin
    const app = initializeApp(firebaseAdminConfig);
    const db = getFirestore(app);

    // Charger les données des projets
    const projectsData = JSON.parse(readFileSync('./public/data/projects.json', 'utf8'));

    console.log('📦 Migration des projets...');

    // Nettoyer la collection existante (optionnel)
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.get();
    
    if (!snapshot.empty) {
      console.log('🗑️ Nettoyage de la collection existante...');
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log('✅ Collection nettoyée');
    }

    // Migrer les projets
    const batch = db.batch();
    
    for (const project of projectsData) {
      const projectRef = projectsRef.doc();
      batch.set(projectRef, {
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        platformUrl: project.platformUrl,
        techStack: project.techStack,
        isFeatured: project.id === 1 || project.id === 2, // Marquer les 2 premiers comme vedettes
        sortOrder: project.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Projet "${project.title}" préparé pour la migration`);
    }

    // Exécuter la migration
    await batch.commit();
    console.log('🎉 Migration vers Firebase Firestore terminée avec succès!');
    
    // Afficher le nombre de projets migrés
    const finalSnapshot = await projectsRef.get();
    console.log(`📊 Total de projets migrés: ${finalSnapshot.size}`);

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

// Exécuter la migration
migrateToFirebase();