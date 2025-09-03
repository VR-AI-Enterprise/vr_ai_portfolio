# 🔐 Configuration des Variables d'Environnement

## 📋 Variables Requises

### **Base de Données**

#### **Développement (SQLite)**
```bash
DATABASE_URL="file:./dev.db"
```

#### **Production (PostgreSQL)**
```bash
# Vercel Postgres
DATABASE_URL="postgresql://username:password@host:port/database"

# Variables Vercel Postgres (automatiques)
POSTGRES_URL="postgres://default:password@ep-xxx-xxx.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:password@ep-xxx-xxx.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:password@ep-xxx-xxx.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-xxx-xxx.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="verceldb"
```

### **Next.js**

#### **Authentification**
```bash
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"  # Développement
NEXTAUTH_URL="https://your-domain.vercel.app"  # Production
```

#### **Application**
```bash
NEXT_PUBLIC_APP_NAME="Vr-Ai Portfolio"
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Développement
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"  # Production
```

### **Upload de Fichiers**
```bash
NEXT_PUBLIC_MAX_FILE_SIZE="5242880"  # 5MB
NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"
NEXT_PUBLIC_UPLOAD_DIR="/uploads"
```

### **Sécurité**
```bash
CORS_ORIGINS="http://localhost:3000,https://your-domain.vercel.app"
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="900000"  # 15 minutes
```

### **Développement**
```bash
DEBUG="false"
LOG_LEVEL="info"
```

## 🚀 Configuration par Environnement

### **1. Développement Local**

Créez un fichier `.env.local` :
```bash
# Base de données
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Vr-Ai Portfolio"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Upload
NEXT_PUBLIC_MAX_FILE_SIZE="5242880"
NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,image/gif"
NEXT_PUBLIC_UPLOAD_DIR="/uploads"

# Développement
DEBUG="true"
LOG_LEVEL="debug"
```

### **2. Production (Vercel)**

Configurez dans le dashboard Vercel :

#### **Variables d'Environnement**
- `DATABASE_URL` → `POSTGRES_PRISMA_URL` (fourni par Vercel)
- `NEXTAUTH_SECRET` → Générer une clé secrète forte
- `NEXTAUTH_URL` → `https://your-domain.vercel.app`
- `NEXT_PUBLIC_APP_NAME` → `Vr-Ai Portfolio`
- `NEXT_PUBLIC_APP_URL` → `https://your-domain.vercel.app`

#### **Variables Vercel Postgres (automatiques)**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 🔧 Commandes de Configuration

### **Développement**
```bash
# Copier le template
cp ENVIRONMENT.md .env.local

# Générer le client Prisma
npx prisma generate

# Pousser le schéma
npx prisma db push

# Démarrer le serveur
npm run dev
```

### **Production**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Configurer les variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Déployer
vercel --prod
```

## 🛡️ Sécurité

### **Bonnes Pratiques**
1. **Ne jamais commiter** les fichiers `.env*`
2. **Utiliser des secrets différents** pour dev/prod
3. **Rotater les secrets** régulièrement
4. **Monitorer les logs** pour les fuites
5. **Utiliser HTTPS** en production

### **Génération de Secrets**
```bash
# Générer une clé secrète
openssl rand -base64 32

# Ou utiliser Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### **Validation des Variables**
```bash
# Vérifier les variables manquantes
npm run check-env

# Tester la connexion DB
npm run test-db
```

## 📊 Monitoring

### **Variables à Surveiller**
- `DATABASE_URL` : Connexion base de données
- `NEXTAUTH_SECRET` : Sécurité authentification
- `NEXTAUTH_URL` : URL de production
- `POSTGRES_*` : Variables Vercel Postgres

### **Alertes Recommandées**
- Erreurs de connexion DB
- Variables d'environnement manquantes
- Secrets exposés dans les logs
- Performance des requêtes DB

## 🚨 Dépannage

### **Erreurs Communes**

#### **"Database connection failed"**
```bash
# Vérifier la variable
echo $DATABASE_URL

# Tester la connexion
npx prisma db push
```

#### **"Prisma client not generated"**
```bash
# Régénérer le client
npx prisma generate

# Redémarrer le serveur
npm run dev
```

#### **"Environment variable not found"**
```bash
# Vérifier le fichier .env.local
cat .env.local

# Redémarrer le serveur
npm run dev
```

### **Commandes de Diagnostic**
```bash
# Vérifier les variables
vercel env ls

# Voir les logs
vercel logs

# Tester la connexion
vercel env pull .env.local
```

---

## 📝 Notes

- **Développement** : Utilisez `.env.local` pour les variables locales
- **Production** : Configurez dans le dashboard Vercel
- **Sécurité** : Ne jamais exposer les secrets dans le code
- **Monitoring** : Surveillez les variables critiques
- **Backup** : Sauvegardez la configuration de production