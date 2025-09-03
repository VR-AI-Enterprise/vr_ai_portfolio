"use client";

import Link from 'next/link';

interface DashboardHeaderProps {
  onAddProject: () => void;
  projectCount: number;
}

export default function DashboardHeader({ onAddProject, projectCount }: DashboardHeaderProps) {
  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Vr-Ai
            </h1>
            <p className="text-foreground/80 mt-1">
              Gestion des projets • {projectCount} projet{projectCount > 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              ← Retour au portfolio
            </Link>
            
            <button
              onClick={onAddProject}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              + Nouveau Projet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}