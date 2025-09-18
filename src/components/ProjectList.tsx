"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProjectListProps {}

export default function ProjectList({}: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des projets");
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
            <div className="absolute inset-0 bg-background/30 dark:bg-background/20 backdrop-blur-sm rounded-xl border border-red-200/30 dark:border-red-800/30"></div>
            <div className="relative py-12">
              <p className="text-red-600 dark:text-red-400">Erreur : {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Container avec glass morphism pour la section titre */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-background/20 dark:bg-background/10 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative py-8 px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Nos Projets
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Découvrez nos réalisations innovantes dans les domaines de la réalité virtuelle et de l&apos;intelligence artificielle.
            </p>
          </div>
        </div>
        
        {/* Layout Grid Simple pour tous les écrans */}
        <div className="py-8">
          {/* Grille responsive pour tous les écrans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
