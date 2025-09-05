"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  initialProjects?: Project[];
  initialError?: string | null;
}

export default function ProjectList({ initialProjects = [], initialError = null }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    // Si on a déjà des projets initiaux, pas besoin de les recharger
    if (initialProjects.length > 0) {
      return;
    }

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
  }, [initialProjects.length]);

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

  // Génération dynamique des positions basée sur le nombre de projets
  const generateDynamicPositions = (projectCount: number) => {
    const positions: { [key: number]: { left: string; top: string } } = {};
    
    // Configuration pour un layout créatif et équilibré
    const horizontalZones = 4; // 4 zones horizontales (0%, 25%, 50%, 75%)
    const verticalSpacing = 6; // Espacement vertical en rem
    const startTop = 2; // Position de départ en rem
    
    for (let i = 0; i < projectCount; i++) {
      const sortOrder = i + 1;
      
      // Génération pseudo-aléatoire basée sur l'index pour la cohérence
      const seed = sortOrder * 7 + 13; // Nombre premier pour la distribution
      const horizontalZone = seed % horizontalZones;
      const verticalOffset = Math.floor(seed / horizontalZones) * verticalSpacing;
      
      // Positions horizontales variées
      const horizontalPositions = ['0%', '25%', '50%', '75%', '10%', '35%', '60%', '85%'];
      const left = horizontalPositions[horizontalZone % horizontalPositions.length];
      
      // Position verticale avec espacement progressif
      const top = `${startTop + verticalOffset + (i * 2)}rem`;
      
      positions[sortOrder] = { left, top };
    }
    
    return positions;
  };

  const positionMap = generateDynamicPositions(projects.length);

  // Calcul dynamique de la hauteur de section basée sur le nombre de projets
  const calculateSectionHeight = (projectCount: number) => {
    const baseHeight = 20; // Hauteur de base en rem
    const projectHeight = 25; // Hauteur par projet en rem
    return `${baseHeight + (projectCount * projectHeight)}rem`;
  };

  return (
    <section 
      className="w-full py-12 px-4 sm:px-6 lg:px-8"
      style={{ minHeight: calculateSectionHeight(projects.length) }}
    >
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
              const position = positionMap[project.sortOrder || index + 1] || { left: '50%', top: '0rem' };
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
