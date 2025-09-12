"use client";

import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.projectUrl || project.platformUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full h-80 rounded-lg overflow-hidden cursor-pointer brick-card hover:shadow-2xl block"
    >
      {/* Badge du type de projet */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-20 bg-blue-500/20 text-blue-200 border border-blue-400/30">
        {project.projectType === 'mobile' ? '📱 Mobile' : '🌐 Web'}
      </div>

      {/* Image du projet */}
      <div className="absolute inset-0">
        <Image
          src={project.imageUrl || '/images/1.jpg'}
          alt={project.title}
          fill
          className="w-full h-full group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Overlay avec pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Effet de couleur au hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

      {/* Titre du projet */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white text-center">{project.title}</h3>
      </div>

      {/* Bordure animée */}
      <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-xl group-hover:border-blue-400/50 dark:group-hover:border-blue-500/30 transition-colors duration-500 z-10 pointer-events-none"></div>
    </Link>
  );
});

export default ProjectCard;