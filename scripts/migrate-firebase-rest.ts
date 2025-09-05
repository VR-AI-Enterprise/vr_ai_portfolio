import { readFileSync } from 'fs';

console.log('🔥 Migration des projets vers Firebase Firestore via REST API...');

// Configuration Firebase
const projectId = process.env.FIREBASE_PROJECT_ID || 'vrai-9a598';
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

async function migrateToFirebase() {
  try {
    // Charger les données des projets
    const projectsData = JSON.parse(readFileSync('./public/data/projects.json', 'utf8'));

    console.log(`📦 Migration de ${projectsData.length} projets...`);

    // Migrer les projets un par un
    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      
      // Préparer les données pour Firestore
      const firestoreData = {
        fields: {
          title: { stringValue: project.title },
          description: { stringValue: project.description },
          imageUrl: { stringValue: project.imageUrl },
          platformUrl: { stringValue: project.platformUrl },
          techStack: { 
            arrayValue: { 
              values: project.techStack.map((tech: string) => ({ stringValue: tech }))
            }
          },
          isFeatured: { booleanValue: project.id === 1 || project.id === 2 },
          sortOrder: { integerValue: project.id.toString() },
          createdAt: { timestampValue: new Date().toISOString() },
          updatedAt: { timestampValue: new Date().toISOString() }
        }
      };

      // Créer le document via REST API
      const response = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(firestoreData)
      });

      if (response.ok) {
        console.log(`✅ Projet ${i + 1}/${projectsData.length}: "${project.title}" migré`);
      } else {
        const error = await response.text();
        console.error(`❌ Erreur pour le projet "${project.title}":`, error);
      }
    }

    console.log('🎉 Migration vers Firebase Firestore terminée!');
    console.log('📝 Note: Cette migration utilise l\'API REST publique de Firebase.');
    console.log('🔒 Pour une migration sécurisée, utilisez les credentials Firebase Admin.');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

// Exécuter la migration
migrateToFirebase();