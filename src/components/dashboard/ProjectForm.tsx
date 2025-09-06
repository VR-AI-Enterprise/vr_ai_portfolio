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
    techStack: [] as string[],
    projectType: 'web' as 'web' | 'mobile',
    isFeatured: false,
    sortOrder: 1
  });
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!project;

  // Charger le nombre de projets pour définir l'ordre par défaut
  useEffect(() => {
    const fetchProjectsCount = async () => {
      try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        setProjectsCount(projects.length);
        if (!isEditing) {
          setFormData(prev => ({
            ...prev,
            sortOrder: projects.length + 1
          }));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    };
    fetchProjectsCount();
  }, [isEditing]);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        platformUrl: project.platformUrl || '',
        techStack: project.techStack,
        projectType: project.projectType || 'web',
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
      const projectData = {
        ...formData,
        techStack: formData.techStack
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTech = e.target.value;
    if (selectedTech && !formData.techStack.includes(selectedTech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, selectedTech]
      }));
    }
  };

  const removeTechStack = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
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
              placeholder={`${projectsCount + 1} (par défaut)`}
            />
            <p className="text-xs text-foreground/60 mt-1">
              Par défaut: {projectsCount + 1} (nombre de projets + 1)
            </p>
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
            Technologies
          </label>
          <select
            name="techStack"
            value=""
            onChange={handleTechStackChange}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner une technologie</option>
            <option value="React">React</option>
            <option value="Next.js">Next.js</option>
            <option value="TypeScript">TypeScript</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
            <option value="MongoDB">MongoDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="Firebase">Firebase</option>
            <option value="Tailwind CSS">Tailwind CSS</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Python">Python</option>
            <option value="Django">Django</option>
            <option value="Flask">Flask</option>
            <option value="Vue.js">Vue.js</option>
            <option value="Angular">Angular</option>
            <option value="Svelte">Svelte</option>
            <option value="React Native">React Native</option>
            <option value="Flutter">Flutter</option>
            <option value="Swift">Swift</option>
            <option value="Kotlin">Kotlin</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="PHP">PHP</option>
            <option value="Laravel">Laravel</option>
            <option value="Symfony">Symfony</option>
            <option value="Ruby">Ruby</option>
            <option value="Rails">Rails</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
            <option value="Docker">Docker</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="AWS">AWS</option>
            <option value="Vercel">Vercel</option>
            <option value="Netlify">Netlify</option>
            <option value="Git">Git</option>
            <option value="GitHub">GitHub</option>
            <option value="GitLab">GitLab</option>
          </select>
          
          {/* Affichage des technologies sélectionnées */}
          {formData.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-200 border border-blue-400/30"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="ml-2 text-blue-300 hover:text-blue-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Type de projet *
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="projectType"
                value="web"
                checked={formData.projectType === 'web'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 focus:ring-blue-500"
              />
              <span className="ml-2 text-foreground">🌐 Web</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="projectType"
                value="mobile"
                checked={formData.projectType === 'mobile'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 focus:ring-blue-500"
              />
              <span className="ml-2 text-foreground">📱 Mobile</span>
            </label>
          </div>
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