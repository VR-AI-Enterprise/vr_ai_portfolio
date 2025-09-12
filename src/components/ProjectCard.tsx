import { Project } from "@/types/project";
import Link from "next/link";
import FirebaseImage from "./FirebaseImage";

interface ProjectCardProps {
  project: Project;
  brickType?: string;
}

export default function ProjectCard({ project, brickType = 'small' }: ProjectCardProps) {
  // Styles spécifiques selon le type de brique
  const getBrickStyles = (type: string) => {
    const styles = {
      small: 'rounded-lg',
      medium: 'rounded-xl',
      large: 'rounded-2xl',
      tall: 'rounded-lg',
      wide: 'rounded-xl',
      square: 'rounded-xl',
      'mobile-tall': 'rounded-xl',
      'mobile-wide': 'rounded-2xl'
    };
    return styles[type as keyof typeof styles] || 'rounded-lg';
  };

  const getBrickGradient = (type: string) => {
    const gradients = {
      small: 'from-blue-500/10 to-purple-500/10',
      medium: 'from-purple-500/10 to-pink-500/10',
      large: 'from-pink-500/10 to-red-500/10',
      // tall: 'from-green-500/10 to-blue-500/10',
      wide: 'from-yellow-500/10 to-orange-500/10',
      square: 'from-cyan-500/10 to-teal-500/10',
      'mobile-tall': 'from-green-500/10 to-emerald-500/10',
      'mobile-wide': 'from-rose-500/10 to-red-500/10'
    };
    return gradients[type as keyof typeof gradients] || 'from-blue-500/10 to-purple-500/10';
  };

  return (
    <Link 
      href={project.platformUrl || '#'} 
      target={project.platformUrl ? "_blank" : "_self"} 
      rel={project.platformUrl ? "noopener noreferrer" : ""}
      className={`group relative w-full h-80 ${getBrickStyles(brickType)} overflow-hidden cursor-pointer brick-card hover:shadow-2xl block`}
    >
      {/* Badge de type de projet */}
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-20
        ${project.projectType === 'web' ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30' : 'bg-green-500/20 text-green-200 border border-green-400/30'}`}
      >
        {project.projectType === 'web' ? '🌐 Web' : '📱 Mobile'}
      </div>
      
      {/* Background avec image du projet */}
      <div className="absolute inset-0">
      {project.imageUrl ? (
                        <FirebaseImage
                        src={project.imageUrl}
                        alt={project.title}
                        width={400}
                        height={320}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      /> 
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {project.title.charAt(0).toUpperCase()}
                        </div>
                      )}
    
        {/* Pattern overlay pour texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      {/* Overlay de base (gradient subtil) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Overlay spécifique au type de brique */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBrickGradient(brickType)} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
      
      {/* Titre centré */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white text-center">
          {project.title}
        </h3>
      </div>

      {/* Border avec glass effect */}
      <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-xl group-hover:border-blue-400/50 dark:group-hover:border-blue-500/30 transition-colors duration-500 z-10 pointer-events-none"></div>
    </Link>
  );
}
