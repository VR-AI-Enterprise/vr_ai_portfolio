export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string; // URL du projet
  platformUrl?: string; // Alias pour compatibilité
  techStack: string[];
  isFeatured?: boolean;
  projectType?: 'web' | 'mobile';
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectsData = Project[];
