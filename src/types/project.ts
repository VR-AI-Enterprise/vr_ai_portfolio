export interface Project {
  id: string; // Changé de number à string pour cohérence avec Prisma
  title: string;
  description: string;
  imagePath?: string; // Chemin vers l'image dans le stockage
  imageUrl?: string; // URL de l'image (legacy)
  techStack: string[];
  platformUrl?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectsData = Project[];
