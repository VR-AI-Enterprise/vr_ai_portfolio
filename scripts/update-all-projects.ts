import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Charger les variables d'environnement depuis .env.production
dotenv.config({ path: '.env.production' });

console.log('🔥 Mise à jour de tous les projets avec le type...');

// Configuration Firebase Admin
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

async function updateAllProjects() {
  try {
    // Initialiser Firebase Admin
    const app = initializeApp(firebaseAdminConfig);
    const db = getFirestore(app);

    console.log('📱 Mise à jour de tous les projets...');
    
    // Récupérer tous les projets
    const projectsSnapshot = await db.collection('projects').get();
    
    if (projectsSnapshot.empty) {
      console.log('❌ Aucun projet trouvé');
      return;
    }

    console.log(`📊 ${projectsSnapshot.size} projets trouvés`);

    // Mise à jour de chaque projet
    for (const doc of projectsSnapshot.docs) {
      const data = doc.data();
      const techStack = data.techStack || [];
      
      // Déterminer le type de projet basé sur le techStack
      const determineProjectType = (techStack: string[]): 'web' | 'mobile' => {
        const mobileKeywords = ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin', 'Xamarin'];
        const hasMobileTech = techStack.some(tech => 
          mobileKeywords.some(keyword => tech.toLowerCase().includes(keyword.toLowerCase()))
        );
        return hasMobileTech ? 'mobile' : 'web';
      };

      const projectType = determineProjectType(techStack);
      
      // Mettre à jour le projet avec le type
      await doc.ref.update({
        projectType: projectType,
        updatedAt: new Date()
      });

      console.log(`✅ ${data.title} -> ${projectType}`);
    }

    console.log('🎉 Tous les projets ont été mis à jour avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour des projets:', error);
  }
}

updateAllProjects();