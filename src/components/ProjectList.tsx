"use client";

import { Project } from '@/types/project';
import { memo, useCallback, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import NoSSR from './NoSSR';

interface ProjectListProps {
  // Props pourraient être ajoutées ici si nécessaire
}

const ProjectList = memo(function ProjectList({}: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/projects", {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Erreur fetchProjects:', err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-background/30 dark:bg-background/20 backdrop-blur-sm rounded-xl"></div>
            <div className="relative py-12">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-foreground/80">Chargement des projets...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/5 backdrop-blur-sm rounded-xl"></div>
            <div className="relative py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchProjects}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-background/30 dark:bg-background/20 backdrop-blur-sm rounded-xl"></div>
            <div className="relative py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Aucun projet trouvé</h2>
              <p className="text-foreground/80">Les projets seront bientôt disponibles.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nos Projets</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Découvrez nos réalisations en réalité virtuelle, intelligence artificielle et réalité augmentée
          </p>
        </div>

        {/* Grille responsive optimisée */}
        <NoSSR fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-project-card-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </NoSSR>
      </div>
    </section>
  );
});

export default ProjectList;