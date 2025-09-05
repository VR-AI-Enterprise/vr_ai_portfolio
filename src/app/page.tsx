import Footer from "@/components/Footer";
import HeaderHybrid from "@/components/HeaderHybrid";
import ProjectList from "@/components/ProjectList";
import { getAllProjects } from "@/lib/projects-firebase";
import { Project } from "@/types/project";

export default async function Home() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await getAllProjects();
  } catch (err) {
    console.error('Erreur lors du chargement des projets:', err);
    error = err instanceof Error ? err.message : 'Erreur inconnue';
  }

  return (
    <div className="min-h-screen">
      <HeaderHybrid />
      <main className="relative">
        <ProjectList initialProjects={projects} initialError={error} />
      </main>
      <Footer />
    </div>
  );
}
