import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer un projet par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: project.id,
      title: project.title,
      description: project.description || '',
      imagePath: project.imagePath || undefined,
      imageUrl: project.imageUrl || undefined,
      platformUrl: project.platformUrl || undefined,
      techStack: project.techStack,
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    });
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
    const { title, description, imagePath, imageUrl, platformUrl, techStack, isFeatured, sortOrder } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imagePath,
        imageUrl,
        platformUrl,
        techStack: techStack,
        isFeatured: isFeatured || false,
        sortOrder: parseInt(sortOrder) || 1
      }
    });

    return NextResponse.json({
      id: updatedProject.id,
      title: updatedProject.title,
      description: updatedProject.description || '',
      imagePath: updatedProject.imagePath || undefined,
      imageUrl: updatedProject.imageUrl || undefined,
      platformUrl: updatedProject.platformUrl || undefined,
      techStack: updatedProject.techStack,
      isFeatured: updatedProject.isFeatured,
      sortOrder: updatedProject.sortOrder,
      createdAt: updatedProject.createdAt,
      updatedAt: updatedProject.updatedAt
    });
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
    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur DELETE projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    );
  }
}