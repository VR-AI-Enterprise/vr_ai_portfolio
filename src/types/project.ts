export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  platformUrl?: string; // Ajout du lien optionnel vers la plateforme
}

export type ProjectsData = Project[];
