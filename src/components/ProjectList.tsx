"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
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

  // Mapping des positions par ID de projet pour un positionnement robuste
  const positionMap: { [key: number]: { left: string; top: string } } = {
    1: { left: '0%', top: '2rem' },      // Look
    2: { left: '40%', top: '20rem' },    // Institut Français Togo
    3: { left: '-10%', top: '37rem' },   // Affund
    4: { left: '60%', top: '39rem' },    // Growl
    5: { left: '20%', top: '65rem' },    // LaTribu
    6: { left: '70%', top: '5rem' },     // FG Influence
    7: { left: '-5%', top: '75rem' },    // DressLike
    8: { left: '55%', top: '80rem' },    // Klumer
       9: { left: '30%', top: '100rem' },    // Affund
  };

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
        
        {/* Layout masonry pour 8 projets */}
        <div className="relative min-h-[1000px] lg:min-h-[2000px] py-8">
          {/* Grille mobile pour 8 projets */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* Layout superposé pour desktop - Positions basées sur l'ID */}
          <div className="hidden lg:block">
            {projects.map((project, index) => {
              const position = positionMap[project.id] || { left: '50%', top: '0rem' };
              const baseZIndex = 10 + index;
              
              return (
                <div
                  key={project.id}
                  className="absolute w-96 transition-all duration-300 group"
                  style={{
                    left: position.left,
                    top: position.top,
                    zIndex: baseZIndex,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.zIndex = '999';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.zIndex = baseZIndex.toString();
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
