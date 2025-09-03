# 🚀 Vr-Ai Portfolio - Portfolio Dynamique avec Base de Données

Un portfolio moderne et dynamique pour Vr-Ai, développé avec Next.js 15, TypeScript, Tailwind CSS et Prisma. Ce projet présente des projets VR, IA et AR avec une interface immersive et des données stockées dans une base de données.

## ✨ Fonctionnalités

- **🎨 Interface Immersive** : Design futuriste avec animations et effets visuels
- **🗄️ Base de Données Dynamique** : Gestion des projets via Prisma + SQLite
- **📱 Responsive Design** : Optimisé pour tous les appareils
- **🎯 Cartes de Projets Interactives** : Layout créatif avec superposition et effets hover
- **🌐 API REST** : Endpoints pour la gestion des données
- **⚡ Performance** : Next.js 15 avec Turbopack
- **🎭 Animations Avancées** : Background animé avec bulles et effets de particules

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 15.4.5** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Framework CSS utility-first
- **React 19** - Bibliothèque UI

### Backend & Base de Données
- **Prisma** - ORM moderne pour TypeScript
- **SQLite** - Base de données locale (développement)
- **API Routes** - Endpoints REST intégrés

### Outils de Développement
- **Turbopack** - Bundler ultra-rapide
- **ESLint** - Linter JavaScript/TypeScript
- **Prisma Studio** - Interface graphique pour la DB

## 📁 Structure du Projet

```
vr-ai-portfolio/
├── src/
│   ├── app/
│   │   ├── api/projects/     # API REST pour les projets
│   │   ├── globals.css       # Styles globaux et animations
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Page d'accueil
│   ├── components/
│   │   ├── AnimatedBackground.tsx  # Background animé global
│   │   ├── HeaderHybrid.tsx        # Header principal
│   │   ├── ProjectCard.tsx         # Carte de projet
│   │   ├── ProjectList.tsx         # Liste des projets
│   │   └── Footer.tsx              # Footer
│   ├── lib/
│   │   ├── prisma.ts         # Configuration Prisma Client
│   │   └── projects.ts       # Service de base de données
│   └── types/
│       └── project.ts        # Types TypeScript
├── prisma/
│   ├── schema.prisma         # Schéma de base de données
│   └── dev.db               # Base de données SQLite
├── public/
│   ├── images/              # Images des projets
│   └── data/                # Données JSON (legacy)
└── scripts/
    └── migrate-projects.ts  # Script de migration
```

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+ 
- npm ou yarn

### 1. Cloner le Projet
```bash
git clone <votre-repo>
cd vr-ai-portfolio
```

### 2. Installer les Dépendances
```bash
npm install
```

### 3. Configuration de la Base de Données
```bash
# Générer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma db push

# Migrer les données existantes
npx tsx scripts/migrate-projects.ts
```

### 4. Démarrer le Serveur de Développement
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🗄️ Gestion de la Base de Données

### Visualiser les Données

#### Option 1 : Prisma Studio (Recommandé)
```bash
npx prisma studio
```
Interface graphique accessible sur [http://localhost:5555](http://localhost:5555)

#### Option 2 : API REST
```bash
curl http://localhost:3000/api/projects
```

### Structure de la Base de Données

```sql
-- Table projects
CREATE TABLE projects (
  id TEXT PRIMARY KEY,           -- ID unique (CUID)
  title TEXT NOT NULL,           -- Titre du projet
  description TEXT,              -- Description
  image_url TEXT NOT NULL,       -- URL de l'image
  platform_url TEXT,             -- Lien vers la plateforme
  tech_stack TEXT NOT NULL,      -- Technologies (JSON)
  is_featured BOOLEAN DEFAULT 0, -- Projet vedette
  sort_order INTEGER DEFAULT 0,  -- Ordre d'affichage
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Ajouter un Nouveau Projet

#### Via Prisma Studio
1. Ouvrir [http://localhost:5555](http://localhost:5555)
2. Cliquer sur "Add record"
3. Remplir les champs
4. Sauvegarder

#### Via Code
```typescript
// Dans src/lib/projects.ts
export async function createProject(projectData: {
  title: string;
  description: string;
  imageUrl: string;
  platformUrl?: string;
  techStack: string[];
  isFeatured?: boolean;
  sortOrder?: number;
}) {
  return await prisma.project.create({
    data: {
      ...projectData,
      techStack: JSON.stringify(projectData.techStack)
    }
  });
}
```

## 🎨 Personnalisation

### Modifier les Animations
Les animations sont définies dans `src/app/globals.css` :

```css
/* Bulles animées */
@keyframes bubble-rise-1 {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}
```

### Ajouter de Nouvelles Technologies
Modifiez le champ `techStack` dans la base de données ou via Prisma Studio.

### Changer le Layout des Cartes
Modifiez `src/components/ProjectList.tsx` pour ajuster les positions :

```typescript
const positionMap: Record<string, { left: string; top: string }> = {
  'project-id-1': { left: '0%', top: '2rem' },
  'project-id-2': { left: '40%', top: '20rem' },
  // ...
};
```

## 📊 API Endpoints

### GET /api/projects
Récupère tous les projets

**Réponse :**
```json
[
  {
    "id": "cmf4erwi600008kitnmjouruk",
    "title": "Look",
    "description": "Votre boutique de lux en ligne !",
    "imageUrl": "/images/look.png",
    "platformUrl": "https://look.vr-ai.co",
    "techStack": ["Unity", "VR", "C#", "WebXR", "Oculus SDK"],
    "isFeatured": true,
    "sortOrder": 1,
    "createdAt": "2025-09-03T20:07:06.318Z",
    "updatedAt": "2025-09-03T20:07:06.318Z"
  }
]
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter votre repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Variables d'Environnement
```bash
# Pour la production avec Vercel Postgres
DATABASE_URL="postgresql://username:password@host:port/database"
```

### Migration vers PostgreSQL
Pour la production, remplacez SQLite par PostgreSQL :

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🎯 Projets Actuels

Le portfolio présente actuellement **9 projets** :

1. **Look** - Boutique VR de luxe
2. **Institut Français Togo** - Plateforme culturelle
3. **Affund** - Expérience métaverse
4. **Growl** - Plateforme d'apprentissage IA
5. **LaTribu** - Jeu VR multi-joueurs
6. **FG Influence** - Marketing d'influence
7. **DressLike** - E-commerce seconde main
8. **Klumer** - Système de vote en ligne
9. **Ndupé** - Logiciel POS restaurant

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter

# Base de données
npx prisma studio    # Interface graphique
npx prisma generate  # Générer le client
npx prisma db push   # Synchroniser le schéma
npx tsx scripts/migrate-projects.ts  # Migrer les données
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 Changelog

### Sprint 5 - Migration Base de Données
- ✅ Migration vers Prisma + SQLite
- ✅ API REST pour les projets
- ✅ Interface de gestion des données
- ✅ Types TypeScript harmonisés

### Sprint 4 - Optimisation Layout
- ✅ Alignement des éléments de carte
- ✅ Correction des liens cliquables
- ✅ Positionnement basé sur l'ID

### Sprint 3 - Layout Créatif
- ✅ Cartes superposées avec z-index
- ✅ Effets hover avancés
- ✅ Layout responsive

### Sprint 2 - Background Global
- ✅ Background animé sur tout le site
- ✅ Bulles animées
- ✅ Intégration glass morphism

### Sprint 1 - Setup Initial
- ✅ Configuration Next.js 15
- ✅ Structure des composants
- ✅ Design de base

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Vr-Ai** - Portfolio dynamique pour présenter les projets VR, IA et AR.

---

**🚀 Votre portfolio est maintenant dynamique et prêt pour la production !**