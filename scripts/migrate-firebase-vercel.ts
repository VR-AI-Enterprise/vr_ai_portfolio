import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

console.log('🔥 Migration des projets vers Firebase Firestore...');

// Configuration Firebase Admin avec les variables d'environnement Vercel
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

async function migrateToFirebase() {
  try {
    // Initialiser Firebase Admin
    const app = initializeApp(firebaseAdminConfig);
    const db = getFirestore(app);

    // Charger les données des projets
    const projectsData = JSON.parse(readFileSync('./public/data/projects.json', 'utf8'));

    console.log(`📦 Migration de ${projectsData.length} projets...`);

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

    // Migrer les projets un par un
    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      const projectRef = projectsRef.doc();
      
      await projectRef.set({
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
      
      console.log(`✅ Projet ${i + 1}/${projectsData.length}: "${project.title}" migré`);
    }

    console.log('🎉 Migration vers Firebase Firestore terminée avec succès!');
    
    // Afficher le nombre de projets migrés
    const finalSnapshot = await projectsRef.get();
    console.log(`📊 Total de projets dans Firestore: ${finalSnapshot.size}`);

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

// Exécuter la migration
migrateToFirebase();