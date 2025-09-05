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
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    imagePath: (data.imagePath as string) || undefined,
    imageUrl: (data.imageUrl as string) || undefined,
    platformUrl: (data.platformUrl as string) || undefined,
    techStack: (data.techStack as string[]) || [],
    isFeatured: (data.isFeatured as boolean) || false,
    sortOrder: (data.sortOrder as number) || 0,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt)
  };
};

// Récupérer tous les projets
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(
      projectsRef,
      orderBy('isFeatured', 'desc'),
      orderBy('sortOrder', 'asc'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push(convertFirestoreToProject(doc));
    });
    
    return projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return [];
  }
}

// Récupérer les projets vedettes
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(
      projectsRef,
      where('isFeatured', '==', true),
      orderBy('sortOrder', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push(convertFirestoreToProject(doc));
    });
    
    return projects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets vedettes:', error);
    return [];
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
    return null;
  }
}

// Créer un nouveau projet
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const now = Timestamp.now();
    
    const docRef = await addDoc(projectsRef, {
      ...projectData,
      createdAt: now,
      updatedAt: now
    });
    
    // Récupérer le projet créé
    const projectSnap = await getDoc(docRef);
    if (!projectSnap.exists()) {
      throw new Error('Erreur lors de la création du projet');
    }
    
    return convertFirestoreToProject(projectSnap);
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    throw error;
  }
}

// Mettre à jour un projet
export async function updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
  try {
    const projectRef = doc(db, COLLECTION_NAME, id);
    
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: Timestamp.now()
    });
    
    // Récupérer le projet mis à jour
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) {
      throw new Error('Projet non trouvé');
    }
    
    return convertFirestoreToProject(projectSnap);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    throw error;
  }
}

// Supprimer un projet
export async function deleteProject(id: string): Promise<void> {
  try {
    const projectRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    throw error;
  }
}

// Compter le nombre total de projets
export async function getProjectsCount(): Promise<number> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(projectsRef);
    return querySnapshot.size;
  } catch (error) {
    console.error('Erreur lors du comptage des projets:', error);
    return 0;
  }
}