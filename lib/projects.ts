import { Project } from '@/types/project'
import { prisma } from './prisma'

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || '',
      imageUrl: project.imageUrl || undefined,
      platformUrl: project.platformUrl || undefined,
      techStack: JSON.parse(project.techStack), // Convertir JSON string en array
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { sortOrder: 'asc' }
    })

    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || '',
      imageUrl: project.imageUrl || undefined,
      platformUrl: project.platformUrl || undefined,
      techStack: JSON.parse(project.techStack), // Convertir JSON string en array
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des projets vedettes:', error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) return null

    return {
      id: project.id,
      title: project.title,
      description: project.description || '',
      imageUrl: project.imageUrl || undefined,
      platformUrl: project.platformUrl || undefined,
      techStack: JSON.parse(project.techStack), // Convertir JSON string en array
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error)
    return null
  }
}