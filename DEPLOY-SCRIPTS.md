# 🚀 Scripts de Déploiement - Vr-Ai Portfolio

Ce dossier contient des scripts automatisés pour déployer votre portfolio en production.

## 📁 Scripts Disponibles

### 1. `deploy-prod.sh` - Déploiement Complet

Script principal pour un déploiement complet en production avec toutes les vérifications.

**Fonctionnalités :**
- ✅ Vérification des prérequis
- ✅ Sauvegarde de l'état actuel
- ✅ Installation des dépendances
- ✅ Génération du client Prisma
- ✅ Test du build
- ✅ Configuration des variables d'environnement
- ✅ Synchronisation de la base de données
- ✅ Migration des données (optionnel)
- ✅ Déploiement sur Vercel
- ✅ Restauration de l'environnement local
- ✅ Affichage des URLs de production

**Usage :**
```bash
# Déploiement complet
./deploy-prod.sh

# Déploiement sans migration des données
./deploy-prod.sh --no-migrate

# Déploiement avec affichage des logs
./deploy-prod.sh --logs

# Afficher l'aide
./deploy-prod.sh --help
```

### 2. `deploy-quick.sh` - Déploiement Rapide

Script simplifié pour les déploiements rapides (build + deploy uniquement).

**Usage :**
```bash
./deploy-quick.sh
```

### 3. `update-db.sh` - Mise à Jour Base de Données

Script pour mettre à jour uniquement la base de données (schéma + données).

**Usage :**
```bash
# Mise à jour complète (schéma + données)
./update-db.sh

# Synchroniser uniquement le schéma
./update-db.sh --schema-only

# Afficher l'aide
./update-db.sh --help
```

### 4. `maintenance.sh` - Maintenance

Script pour les tâches de maintenance et de vérification.

**Usage :**
```bash
# Nettoyer le projet
./maintenance.sh clean

# Tester le build
./maintenance.sh build

# Vérifier le code
./maintenance.sh lint

# Vérifier les types
./maintenance.sh type-check

# Tester la base de données
./maintenance.sh test-db

# Voir les logs
./maintenance.sh logs

# Voir le statut
./maintenance.sh status

# Créer une sauvegarde
./maintenance.sh backup

# Restaurer une sauvegarde
./maintenance.sh restore

# Afficher l'aide
./maintenance.sh help
```

## 🔧 Prérequis

Avant d'utiliser les scripts, assurez-vous d'avoir :

1. **Node.js** installé
2. **npm** installé
3. **Vercel CLI** installé : `npm install -g vercel`
4. **Connexion Vercel** : `vercel login`
5. **Variables d'environnement** configurées sur Vercel

## 📋 Variables d'Environnement Requises

Les scripts utilisent automatiquement les variables d'environnement configurées sur Vercel :

- `DATABASE_URL` - URL de connexion PostgreSQL
- `NEXTAUTH_SECRET` - Clé secrète pour l'authentification
- `NEXTAUTH_URL` - URL de production

## 🚀 Workflow de Déploiement

### Déploiement Complet (Recommandé)

```bash
# 1. Exécuter le script complet
./deploy-prod.sh

# 2. Le script va :
#    - Vérifier tous les prérequis
#    - Sauvegarder l'état actuel
#    - Installer les dépendances
#    - Générer le client Prisma
#    - Tester le build
#    - Configurer l'environnement
#    - Synchroniser la base de données
#    - Proposer la migration des données
#    - Déployer sur Vercel
#    - Restaurer l'environnement local
#    - Afficher les URLs de production
```

### Déploiement Rapide

```bash
# Pour les mises à jour rapides (code uniquement)
./deploy-quick.sh
```

## 🔍 Dépannage

### Erreur : "Vercel CLI not found"
```bash
npm install -g vercel
```

### Erreur : "Not logged in to Vercel"
```bash
vercel login
```

### Erreur : "Build failed"
```bash
# Vérifier les erreurs de compilation
npm run build

# Vérifier les types TypeScript
npx tsc --noEmit
```

### Erreur : "Database connection failed"
```bash
# Vérifier les variables d'environnement
vercel env ls

# Récupérer les variables de production
vercel env pull .env.production --environment=production
```

## 📊 Monitoring

### Vérifier le statut du déploiement
```bash
vercel ls
```

### Voir les logs
```bash
vercel logs --limit=20
```

### Ouvrir le projet
```bash
vercel open
```

## 🔐 Sécurité

- Les scripts sauvegardent automatiquement vos fichiers `.env`
- L'environnement local est restauré après le déploiement
- Les variables d'environnement sensibles ne sont jamais affichées
- Les fichiers temporaires sont nettoyés automatiquement

## 📝 Logs

Les scripts génèrent des logs détaillés avec :
- ✅ Messages de succès (vert)
- ℹ️ Informations (bleu)
- ⚠️ Avertissements (jaune)
- ❌ Erreurs (rouge)

## 🎯 Exemples d'Usage

### Premier déploiement
```bash
./deploy-prod.sh
```

### Mise à jour de code uniquement
```bash
./deploy-quick.sh
```

### Déploiement avec migration de données
```bash
./deploy-prod.sh --logs
```

### Déploiement sans migration
```bash
./deploy-prod.sh --no-migrate
```

## 🆘 Support

En cas de problème :

1. Vérifiez les prérequis
2. Consultez les logs d'erreur
3. Vérifiez la configuration Vercel
4. Testez manuellement : `npm run build && vercel --prod`

---

**🚀 Vos scripts de déploiement sont prêts ! Utilisez `./deploy-prod.sh` pour un déploiement complet.**