"use client";

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Notification from '@/components/dashboard/Notification';
import ProjectForm from '@/components/dashboard/ProjectForm';
import ProjectTable from '@/components/dashboard/ProjectTable';
import { Project } from '@/types/project';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    setShowForm(false);
    setNotification({
      message: 'Projet créé avec succès !',
      type: 'success'
    });
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setEditingProject(null);
    setShowForm(false);
    setNotification({
      message: 'Projet modifié avec succès !',
      type: 'success'
    });
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setNotification({
      message: 'Projet supprimé avec succès !',
      type: 'success'
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-foreground/80">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onAddProject={() => setShowForm(true)}
        projectCount={projects.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onProjectAdded={handleProjectAdded}
              onProjectUpdated={handleProjectUpdated}
              onCancel={handleCancel}
            />
          </div>
        )}

        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleProjectDeleted}
          onRefresh={fetchProjects}
        />
      </main>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}