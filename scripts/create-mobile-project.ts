import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Charger les variables d'environnement depuis .env.production
dotenv.config({ path: '.env.production' });

console.log('🔥 Création d\'un projet mobile de test...');

// Configuration Firebase Admin
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

async function createMobileProject() {
  try {
    // Initialiser Firebase Admin
    const app = initializeApp(firebaseAdminConfig);
    const db = getFirestore(app);

    console.log('📱 Création d\'un projet mobile...');
    
    // Créer un nouveau projet mobile
    const mobileProject = {
      title: 'App Mobile VR',
      description: 'Application mobile de réalité virtuelle immersive avec interactions tactiles avancées.',
      imageUrl: '/images/look.png', // Utiliser une image existante
      platformUrl: 'https://mobile.vr-ai.co',
      techStack: ['React Native', 'Unity', 'VR', 'iOS', 'Android', 'Swift', 'Kotlin'],
      projectType: 'mobile',
      isFeatured: true,
      sortOrder: 1, // Premier projet
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Ajouter le projet à Firebase
    const docRef = await db.collection('projects').add(mobileProject);
    console.log(`✅ Projet mobile créé avec l'ID: ${docRef.id}`);

    // Mettre à jour les sortOrder des autres projets
    const projectsSnapshot = await db.collection('projects').get();
    let sortOrder = 2;
    
    for (const doc of projectsSnapshot.docs) {
      if (doc.id !== docRef.id) {
        await doc.ref.update({
          sortOrder: sortOrder,
          updatedAt: new Date()
        });
        sortOrder++;
      }
    }

    console.log('🎉 Projet mobile créé et ordre mis à jour !');
  } catch (error) {
    console.error('❌ Erreur lors de la création du projet mobile:', error);
  }
}

createMobileProject();