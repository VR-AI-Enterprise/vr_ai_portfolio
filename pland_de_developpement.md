Plan de développement du portfolio Vr-Ai
Ce document est un plan de travail destiné à un développeur frontend. L'objectif est de prendre le code initial et de le finaliser en un site web de portfolio simple et performant pour l'entreprise Vr-Ai.

1. Contexte du Projet
Nom du projet : Portfolio Vr-Ai Entreprise

Technologies : Le projet sera basé sur une application Next.js 15.4.1 (Fullstack) et TypeScript, avec un App Router. Le stylisme est géré par Tailwind CSS.

Objectif : Créer un site vitrine minimaliste et responsive pour présenter nos projets.

2. Structure de l'application et composants
La structure du projet doit suivre l'organisation de l'App Router de Next.js. Le code actuel peut être décomposé en plusieurs fichiers pour une meilleure maintenabilité.

app/layout.tsx : Fichier de mise en page globale. Inclura la balise <head>, la gestion de la police de caractères (ex: Inter), et l'intégration de Tailwind CSS.

app/page.tsx : Fichier principal de la page d'accueil. Il importera les composants Header, ProjectList et Footer.

components/Header.tsx : Composant pour l'en-tête. Il doit afficher le logo et le nom de l'entreprise.

components/ProjectList.tsx : Composant principal pour afficher les projets. Il chargera les données des projets et les rendra sous forme de cartes.

components/ProjectCard.tsx : Un composant réutilisable pour afficher une carte de projet individuelle (image, titre, description).

components/Footer.tsx : Composant pour le pied de page.

3. Données et Contenu
Source de données : Au lieu d'utiliser des données statiques dans le composant, les données des projets seront stockées dans un fichier projects.json situé dans le dossier public/data. Cela permettra une gestion plus simple du contenu.

Structure de projects.json : Le fichier doit contenir un tableau d'objets, chaque objet représentant un projet.

[
  {
    "id": 1,
    "title": "Nom du Projet",
    "description": "Description détaillée du projet...",
    "imageUrl": "/images/projet-1.webp",
    "techStack": ["Next.js", "IA", "VR"]
  }
]

Images : Les images des projets doivent être placées dans le dossier public/images et optimisées pour le web (format WebP, taille réduite).

4. Tâches techniques
Mettre en place la structure Next.js : Créer les fichiers et dossiers nécessaires (app/, components/, public/data/).

Extraire les données : Déplacer les données des projets du composant ProjectList vers un fichier projects.json.

Récupérer les données : Dans le composant ProjectList.tsx, utiliser fetch pour lire le fichier projects.json.

Décomposer en composants : Créer les composants Header, ProjectCard et Footer en les important dans la page principale.

Améliorer le design :

S'assurer que la disposition en grille de la liste de projets est entièrement responsive (en utilisant les utilitaires de Tailwind comme md:grid-cols-2, lg:grid-cols-3).

Mettre à jour le pied de page avec les bonnes informations de l'entreprise.

Optimisation et performance :

Implémenter le composant <Image> de Next.js pour l'optimisation automatique des images.

Vérifier l'accessibilité du site (balises alt pour les images, etc.).

Ce plan couvre les étapes essentielles pour développer un portfolio fonctionnel et bien structuré. Si le développeur a des questions ou des suggestions, il pourra utiliser ce document comme point de départ pour la discussion.