#!/usr/bin/env node

const fs = require('fs');

console.log('🔥 Ajout des projets via l\'API de l\'application...');

// Charger les données des projets
const projectsData = JSON.parse(fs.readFileSync('./public/data/projects.json', 'utf8'));

async function addProjects() {
  const baseUrl = 'https://vr-ai-portfolio-4pgusc824-emmanuels-projects-fabcf647.vercel.app';
  
  for (let i = 0; i < projectsData.length; i++) {
    const project = projectsData[i];
    
    try {
      const response = await fetch(`${baseUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          platformUrl: project.platformUrl,
          techStack: project.techStack,
          isFeatured: project.id === 1 || project.id === 2,
          sortOrder: project.id
        })
      });

      if (response.ok) {
        console.log(`✅ Projet ${i + 1}/${projectsData.length}: "${project.title}" ajouté`);
      } else {
        const error = await response.text();
        console.error(`❌ Erreur pour le projet "${project.title}":`, error);
      }
    } catch (error) {
      console.error(`❌ Erreur réseau pour le projet "${project.title}":`, error.message);
    }
  }
  
  console.log('🎉 Tous les projets ont été traités!');
}

addProjects();