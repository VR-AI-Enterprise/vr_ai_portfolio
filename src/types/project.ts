export interface Project {
  id: string; // Changé de number à string pour cohérence avec Prisma
  title: string;
  description: string;
  imageUrl?: string; // URL de l'image Firebase Storage
  techStack: string[];
  platformUrl?: string;
  isFeatured?: boolean;
  projectType?: string;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectsData = Project[];
