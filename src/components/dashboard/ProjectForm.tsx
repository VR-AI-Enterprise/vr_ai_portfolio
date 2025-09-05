"use client";

import { Project } from '@/types/project';
import { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';

interface ProjectFormProps {
  project?: Project | null;
  onProjectAdded: (project: Project) => void;
  onProjectUpdated: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({ 
  project, 
  onProjectAdded, 
  onProjectUpdated, 
  onCancel 
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    platformUrl: '',
    techStack: '',
    isFeatured: false,
    sortOrder: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        platformUrl: project.platformUrl || '',
        techStack: project.techStack.join(', '),
        isFeatured: project.isFeatured || false,
        sortOrder: project.sortOrder || 1
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      const projectData = {
        ...formData,
        techStack: techStackArray
      };

      const url = isEditing ? `/api/projects/${project.id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      const savedProject = await response.json();
      
      if (isEditing) {
        onProjectUpdated(savedProject);
      } else {
        onProjectAdded(savedProject);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du projet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ordre d&apos;affichage
            </label>
            <input
              type="number"
              name="sortOrder"
              value={formData.sortOrder}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description du projet"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ImageUpload
            onImageUploaded={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
            currentImage={formData.imageUrl}
            disabled={loading}
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL de l&apos;image (legacy - optionnel)
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/images/projet.png"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            URL de la plateforme
          </label>
          <input
            type="url"
            name="platformUrl"
            value={formData.platformUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemple.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Technologies (séparées par des virgules)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="React, TypeScript, Next.js"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-foreground">
            Projet vedette
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Sauvegarde...' : (isEditing ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  );
}