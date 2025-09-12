import { Project } from '@/types/project';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'projects';

// Convertir Firestore Timestamp en Date
const convertTimestamp = (timestamp: unknown): Date => {
  if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
    return (timestamp as { toDate: () => Date }).toDate();
  }
  return timestamp as Date;
};

// Convertir les données Firestore en Project
const convertFirestoreToProject = (doc: { id: string; data: () => Record<string, unknown> }): Project => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title as string,
    description: data.description as string,
    imageUrl: data.imageUrl as string,
    projectUrl: data.projectUrl as string,
    techStack: (data.techStack as string[]) || [],
    projectType: (data.projectType as 'web' | 'mobile') || 'web',
    isFeatured: (data.isFeatured as boolean) || false,
    sortOrder: (data.sortOrder as number) || 1,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt)
  };
};

// Récupérer tous les projets avec cache et optimisation
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(projectsRef, orderBy('sortOrder', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(convertFirestoreToProject);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    throw new Error('Impossible de récupérer les projets');
  }
}

// Récupérer un projet par ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projectRef = doc(db, COLLECTION_NAME, id);
    const projectSnap = await getDoc(projectRef);
    
    if (!projectSnap.exists()) {
      return null;
    }
    
    return convertFirestoreToProject(projectSnap);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    throw new Error('Impossible de récupérer le projet');
  }
}

// Récupérer les projets mis en avant
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(
      projectsRef, 
      where('isFeatured', '==', true),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(convertFirestoreToProject);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets mis en avant:', error);
    throw new Error('Impossible de récupérer les projets mis en avant');
  }
}

// Récupérer les projets par type
export async function getProjectsByType(projectType: 'web' | 'mobile'): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(
      projectsRef, 
      where('projectType', '==', projectType),
      orderBy('sortOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(convertFirestoreToProject);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets par type:', error);
    throw new Error('Impossible de récupérer les projets par type');
  }
}

// Créer un nouveau projet
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const now = new Date();
    
    const newProject = {
      ...projectData,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now)
    };
    
    const docRef = await addDoc(projectsRef, newProject);
    
    return {
      id: docRef.id,
      ...projectData,
      createdAt: now,
      updatedAt: now
    };
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    throw new Error('Impossible de créer le projet');
  }
}

// Mettre à jour un projet
export async function updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
  try {
    const projectRef = doc(db, COLLECTION_NAME, id);
    const now = new Date();
    
    const updateData = {
      ...projectData,
      updatedAt: Timestamp.fromDate(now)
    };
    
    await updateDoc(projectRef, updateData);
    
    // Récupérer le projet mis à jour
    const updatedProject = await getProjectById(id);
    if (!updatedProject) {
      throw new Error('Projet non trouvé après mise à jour');
    }
    
    return updatedProject;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    throw new Error('Impossible de mettre à jour le projet');
  }
}

// Supprimer un projet
export async function deleteProject(id: string): Promise<void> {
  try {
    const projectRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    throw new Error('Impossible de supprimer le projet');
  }
}

// Rechercher des projets
export async function searchProjects(searchTerm: string): Promise<Project[]> {
  try {
    const projects = await getAllProjects();
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  } catch (error) {
    console.error('Erreur lors de la recherche des projets:', error);
    throw new Error('Impossible de rechercher les projets');
  }
}