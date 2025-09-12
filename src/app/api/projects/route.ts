import { createProject, getAllProjects } from '@/lib/projects-firebase';
import type { Project } from '@/types/project';
import { NextRequest, NextResponse } from 'next/server';

// Cache pour les projets (10 secondes en dev, 1 minute en prod)
const CACHE_DURATION = process.env.NODE_ENV === 'development' ? 10 * 1000 : 60 * 1000;
let projectsCache: { data: Project[]; timestamp: number } | null = null;

export async function GET() {
  try {
    // Vérifier le cache
    if (projectsCache && Date.now() - projectsCache.timestamp < CACHE_DURATION) {
    return NextResponse.json(projectsCache.data, {
      headers: {
        'Cache-Control': process.env.NODE_ENV === 'development' 
          ? 'no-cache, no-store, must-revalidate' 
          : 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'HIT'
      }
    });
    }

    const projects = await getAllProjects()
    
    // Mettre à jour le cache
    projectsCache = {
      data: projects,
      timestamp: Date.now()
    };

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': process.env.NODE_ENV === 'development' 
          ? 'no-cache, no-store, must-revalidate' 
          : 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'MISS'
      }
    });
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
    
    // Validation des données
    const { title, description, imageUrl, platformUrl, techStack, projectType, isFeatured, sortOrder } = body;
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Le titre et la description sont requis' },
        { status: 400 }
      );
    }

    // Invalider le cache
    projectsCache = null;

    const newProject = await createProject({
      title,
      description,
      imageUrl: imageUrl || '',
      platformUrl: platformUrl || '',
      techStack: techStack || [],
      projectType: projectType || 'web',
      isFeatured: isFeatured || false,
      sortOrder: parseInt(sortOrder) || 1
    });

    return NextResponse.json(newProject, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Erreur POST projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
}