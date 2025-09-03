# 🚀 Guide de Déploiement en Production

## 📋 Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **GitHub Repository** : Votre code doit être sur GitHub
3. **Vercel CLI** (optionnel) : `npm i -g vercel`

## 🗄️ Configuration de la Base de Données

### 1. Créer une Base de Données Vercel Postgres

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Cliquez sur **"Storage"** → **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Choisissez un nom : `vr-ai-portfolio-db`
5. Sélectionnez la région : `Europe (Paris)`
6. Cliquez sur **"Create"**

### 2. Récupérer les Variables d'Environnement

Après création, Vercel vous fournira :
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement via GitHub (Recommandé)

1. **Connecter GitHub** :
   - Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
   - Cliquez sur **"New Project"**
   - Importez votre repository GitHub

2. **Configuration du Projet** :
   - **Framework Preset** : Next.js
   - **Root Directory** : `./`
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`
   - **Install Command** : `npm install`

3. **Variables d'Environnement** :
   ```
   DATABASE_URL = POSTGRES_PRISMA_URL (de Vercel)
   NEXTAUTH_SECRET = votre-clé-secrète
   NEXTAUTH_URL = https://votre-domaine.vercel.app
   ```

4. **Déployer** :
   - Cliquez sur **"Deploy"**
   - Attendez la fin du build

### Option 2 : Déploiement via CLI

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Configurer les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

## 🗃️ Migration de la Base de Données

### 1. Générer le Client Prisma
```bash
npx prisma generate
```

### 2. Pousser le Schéma vers la Production
```bash
npx prisma db push
```

### 3. Migrer les Données (Optionnel)
```bash
# Si vous avez des données à migrer
npx prisma migrate deploy
```

## 📁 Structure des Fichiers de Production

```
vr-ai-portfolio/
├── .next/                 # Build Next.js
├── prisma/
│   ├── schema.prisma      # Schéma PostgreSQL
│   └── migrations/        # Migrations (si utilisées)
├── src/
│   ├── app/
│   │   ├── api/          # API Routes
│   │   └── dashboard/    # Dashboard
│   └── components/       # Composants React
├── public/
│   └── uploads/          # Images uploadées
├── vercel.json           # Configuration Vercel
└── package.json          # Scripts de production
```

## 🔧 Configuration Post-Déploiement

### 1. Vérifier le Déploiement
- Visitez votre URL Vercel
- Testez le portfolio : `https://votre-domaine.vercel.app`
- Testez le dashboard : `https://votre-domaine.vercel.app/dashboard`

### 2. Configurer un Domaine Personnalisé (Optionnel)
1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

### 3. Monitoring et Analytics
- **Vercel Analytics** : Activé automatiquement
- **Logs** : Disponibles dans le dashboard Vercel
- **Performance** : Monitoring automatique

## 🚨 Dépannage

### Erreurs Communes

1. **"Database connection failed"** :
   - Vérifiez les variables d'environnement
   - Assurez-vous que `DATABASE_URL` pointe vers `POSTGRES_PRISMA_URL`

2. **"Prisma client not generated"** :
   - Ajoutez `"postinstall": "prisma generate"` dans package.json
   - Redéployez le projet

3. **"Build failed"** :
   - Vérifiez les logs de build dans Vercel
   - Assurez-vous que tous les imports sont corrects

### Commandes Utiles

```bash
# Vérifier le statut du déploiement
vercel ls

# Voir les logs
vercel logs

# Redéployer
vercel --prod

# Ouvrir le projet
vercel open
```

## 📊 Performance et Optimisation

### Optimisations Automatiques Vercel
- **Edge Functions** : API routes optimisées
- **Image Optimization** : Images Next.js optimisées
- **CDN Global** : Distribution mondiale
- **Automatic HTTPS** : SSL/TLS automatique

### Recommandations
1. **Images** : Utilisez `next/image` pour l'optimisation
2. **API Routes** : Limitez la durée à 30s max
3. **Database** : Utilisez les connexions poolées
4. **Caching** : Configurez les headers de cache

## 🔐 Sécurité

### Variables d'Environnement Sensibles
- `DATABASE_URL` : URL de connexion base de données
- `NEXTAUTH_SECRET` : Clé secrète pour l'authentification
- `NEXTAUTH_URL` : URL de production

### Bonnes Pratiques
1. **Ne jamais commiter** les fichiers `.env`
2. **Utiliser HTTPS** en production
3. **Limiter les accès** au dashboard
4. **Sauvegarder régulièrement** la base de données

## 📈 Monitoring

### Métriques Disponibles
- **Performance** : Temps de réponse, Core Web Vitals
- **Usage** : Requêtes, bande passante
- **Erreurs** : Logs d'erreur en temps réel
- **Database** : Connexions, requêtes

### Alertes
- Configurez des alertes pour les erreurs critiques
- Surveillez l'utilisation de la base de données
- Monitorer les performances

---

## 🎉 Félicitations !

Votre portfolio Vr-Ai est maintenant en production ! 

**URLs importantes :**
- **Portfolio** : `https://votre-domaine.vercel.app`
- **Dashboard** : `https://votre-domaine.vercel.app/dashboard`
- **API** : `https://votre-domaine.vercel.app/api/projects`

**Support :**
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Next.js](https://nextjs.org/docs)