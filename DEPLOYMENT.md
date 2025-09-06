# 🚀 Guide de Déploiement - Vr-Ai Portfolio

Ce guide explique comment déployer et maintenir l'application Vr-Ai Portfolio en production.

## 📋 Prérequis

- Node.js 18+ installé
- Vercel CLI installé : `npm i -g vercel`
- Compte Vercel configuré
- Variables d'environnement Firebase configurées

## 🛠️ Scripts Disponibles

### 1. Script Principal de Déploiement
```bash
./deploy-prod.sh
```
**Fonctionnalités :**
- ✅ Nettoyage des fichiers temporaires
- ✅ Installation des dépendances
- ✅ Vérification TypeScript et ESLint
- ✅ Build de production
- ✅ Déploiement sur Vercel
- ✅ Tests automatiques post-déploiement
- ✅ Messages colorés et informatifs

### 2. Script de Vérification
```bash
./verify-prod.sh
```
**Fonctionnalités :**
- ✅ Test de la page d'accueil
- ✅ Test de l'API projets
- ✅ Test de responsivité
- ✅ Vérification des cartes (h-80)
- ✅ Test des badges de type

### 3. Script de Rollback
```bash
./rollback-prod.sh
```
**Fonctionnalités :**
- ✅ Liste des déploiements récents
- ✅ Restauration vers une version précédente
- ✅ Vérification optionnelle du rollback

### 4. Script de Maintenance (Menu Interactif)
```bash
./maintenance.sh
```
**Options disponibles :**
1. 🚀 Déployer en production
2. 🧪 Vérifier la production
3. 🔄 Rollback
4. 📊 Statut des déploiements
5. 🔍 Logs de production
6. 🧹 Nettoyage local
7. 🔧 Vérification locale
8. 📋 Informations projet
9. ❌ Quitter

## 🚀 Déploiement Rapide

### Option 1 : Script Automatique
```bash
./deploy-prod.sh
```

### Option 2 : Menu Interactif
```bash
./maintenance.sh
# Choisir l'option 1
```

### Option 3 : Vercel Direct
```bash
vercel --prod
```

## 🔧 Configuration Requise

### Variables d'Environnement Vercel
Assurez-vous que ces variables sont configurées dans Vercel :

```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=vrai-9a598
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...
FIREBASE_STORAGE_BUCKET=vrai-9a598.firebasestorage.app

# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vrai-9a598.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vrai-9a598
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vrai-9a598.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Fichier .env.production
Créez un fichier `.env.production` avec vos variables Firebase pour les tests locaux.

## 📊 Monitoring et Maintenance

### Vérifier le Statut
```bash
vercel ls
vercel env ls production
```

### Voir les Logs
```bash
vercel logs
vercel logs --limit 100
```

### Rollback en Cas de Problème
```bash
./rollback-prod.sh
# Ou
vercel promote <deployment-url>
```

## 🧪 Tests Post-Déploiement

### Tests Automatiques
Le script `deploy-prod.sh` effectue automatiquement :
- Test de l'API `/api/projects`
- Vérification du nombre de projets
- Test de responsivité
- Vérification des cartes (hauteur h-80)

### Tests Manuels
1. **Page d'accueil** : Vérifier l'affichage des projets
2. **Responsivité** : Tester sur mobile/tablet/desktop
3. **API** : Tester `/api/projects` et `/api/projects/[id]`
4. **Dashboard** : Vérifier l'interface d'administration

## 🚨 Dépannage

### Problèmes Courants

#### 1. Erreur de Build
```bash
# Nettoyer et rebuilder
rm -rf .next node_modules
npm install
npm run build
```

#### 2. Variables d'Environnement Manquantes
```bash
# Vérifier les variables Vercel
vercel env ls production

# Ajouter une variable
vercel env add VARIABLE_NAME production
```

#### 3. API Non Fonctionnelle
- Vérifier les variables Firebase
- Vérifier les permissions Firestore
- Consulter les logs Vercel

#### 4. Projets Non Affichés
- Vérifier que les cartes ont `h-80`
- Vérifier la grille responsive
- Tester l'API `/api/projects`

### Logs Utiles
```bash
# Logs en temps réel
vercel logs --follow

# Logs d'une fonction spécifique
vercel logs --function=api/projects/route
```

## 📈 Optimisations

### Performance
- Images optimisées avec Next.js Image
- Lazy loading des composants
- CSS Grid pour la responsivité
- Animations CSS optimisées

### Sécurité
- Variables d'environnement sécurisées
- Validation des données API
- CORS configuré
- Firebase Security Rules

## 🔄 Workflow de Déploiement

1. **Développement** : Modifications locales
2. **Test** : `./maintenance.sh` → Option 7
3. **Déploiement** : `./deploy-prod.sh`
4. **Vérification** : `./verify-prod.sh`
5. **Monitoring** : `vercel logs`

## 📞 Support

En cas de problème :
1. Consulter les logs Vercel
2. Vérifier les variables d'environnement
3. Tester localement avec `npm run dev`
4. Utiliser le script de rollback si nécessaire

---

**Note** : Tous les scripts incluent des messages colorés et des vérifications d'erreur pour faciliter le débogage.