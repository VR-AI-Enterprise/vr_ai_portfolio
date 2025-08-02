export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
}

export type ProjectsData = Project[];