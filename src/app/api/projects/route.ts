import { createProject, getAllProjects } from '@/lib/projects-firebase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Erreur API projets:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, platformUrl, techStack, isFeatured, sortOrder } = body

    const newProject = await createProject({
      title,
      description,
      imageUrl,
      platformUrl,
      techStack: techStack || [],
      isFeatured: isFeatured || false,
      sortOrder: parseInt(sortOrder) || 1
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Erreur POST projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
}