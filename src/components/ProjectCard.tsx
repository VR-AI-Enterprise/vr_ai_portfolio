import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Propriétés fixes et uniformes pour toutes les cartes
  const cardProps = {
    height: 'h-96',
    width: 'w-[40rem]',
    scale: 'scale-100',
    zIndex: 20,
    rotation: 'rotate-0',
    offsetX: 'translate-x-0',
    offsetY: 'translate-y-0'
  };

  return (
    <div 
      className={`group relative ${cardProps.height} ${cardProps.width} ${cardProps.scale} ${cardProps.rotation} ${cardProps.offsetX} ${cardProps.offsetY} rounded-xl overflow-hidden cursor-pointer hover:-translate-y-6 hover:scale-110 hover:rotate-0 hover:translate-x-0 transition-all duration-700 hover:shadow-2xl`}
    >
      {/* Background avec image du projet */}
      <div className="absolute inset-0">
        <Image
          src={project.imageUrl || '/images/placeholder.png'}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        {/* Pattern overlay pour texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      {/* Glow effect retiré car l'image est maintenant le focus principal */}
      
      {/* Overlay de base (gradient subtil) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Titre et bouton toujours visibles, maintenant alignés */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center gap-3">
        <h3 className="text-2xl font-bold text-white">
          {project.title}
        </h3>
        
        {project.platformUrl && (
          <Link href={project.platformUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
            <span className="mr-2">Voir la plateforme</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>

      {/* Border avec glass effect */}
      <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-xl group-hover:border-blue-400/50 dark:group-hover:border-blue-500/30 transition-colors duration-500 z-10 pointer-events-none"></div>
    </div>
  );
}
