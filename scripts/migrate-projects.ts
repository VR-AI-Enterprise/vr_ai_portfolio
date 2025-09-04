import { PrismaClient } from '@prisma/client'
import projectsData from '../public/data/projects.json'

const prisma = new PrismaClient()

async function migrateProjects() {
  try {
    console.log('🚀 Début de la migration des projets...')

    // Nettoyer la table existante (optionnel)
    await prisma.project.deleteMany()
    console.log('✅ Table projects nettoyée')

    // Insérer les nouveaux projets
    for (const project of projectsData) {
      await prisma.project.create({
        data: {
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          platformUrl: project.platformUrl,
          techStack: project.techStack, // Array natif pour PostgreSQL
          isFeatured: project.id === 1 || project.id === 2, // Marquer les 2 premiers comme vedettes
          sortOrder: project.id
        }
      })
      console.log(`✅ Projet "${project.title}" migré`)
    }

    console.log('🎉 Migration terminée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateProjects()