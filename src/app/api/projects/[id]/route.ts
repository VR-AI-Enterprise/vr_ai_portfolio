import { deleteProject, getProjectById, updateProject } from '@/lib/projects-firebase';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer un projet par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erreur GET projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du projet' },
      { status: 500 }
    );
  }
}

// PUT - Modifier un projet
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, imageUrl, platformUrl, techStack, isFeatured, sortOrder } = body;

    const updatedProject = await updateProject(id, {
      title,
      description,
      imageUrl,
      platformUrl,
      techStack: techStack || [],
      isFeatured: isFeatured || false,
      sortOrder: parseInt(sortOrder) || 1
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Erreur PUT projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la modification du projet' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un projet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProject(id);

    return NextResponse.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur DELETE projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    );
  }
}