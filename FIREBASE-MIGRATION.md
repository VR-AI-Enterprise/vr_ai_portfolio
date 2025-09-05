# 🔥 Migration vers Firebase Firestore - Vr-Ai Portfolio

Ce guide vous accompagne dans la migration de PostgreSQL vers Firebase Firestore.

## 📋 Prérequis

1. **Compte Google** avec accès à Firebase
2. **Projet Firebase** créé
3. **Firestore Database** activé
4. **Service Account** configuré

## 🚀 Configuration Firebase

### 1. Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Cliquez sur **"Add project"**
3. Nommez votre projet : `vr-ai-portfolio`
4. Activez **Google Analytics** (optionnel)
5. Cliquez sur **"Create project"**

### 2. Activer Firestore Database

1. Dans votre projet Firebase, allez dans **"Firestore Database"**
2. Cliquez sur **"Create database"**
3. Choisissez **"Start in test mode"** (pour commencer)
4. Sélectionnez une région : **Europe (eur3)** ou **Europe (eur1)**
5. Cliquez sur **"Done"**

### 3. Configurer les Règles de Sécurité

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture/écriture pour tous (à ajuster selon vos besoins)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. Obtenir les Clés de Configuration

#### Variables Côté Client (Frontend)

1. Allez dans **Project Settings** > **General**
2. Dans la section **"Your apps"**, cliquez sur **"Web app"**
3. Nommez votre app : `vr-ai-portfolio-web`
4. Copiez les valeurs de configuration :

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

#### Variables Côté Serveur (Backend)

1. Allez dans **Project Settings** > **Service Accounts**
2. Cliquez sur **"Generate new private key"**
3. Téléchargez le fichier JSON
4. Extrayez les valeurs suivantes :

```json
{
  "project_id": "your-project-id",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

## 🔧 Configuration des Variables d'Environnement

### Variables Vercel

Configurez ces variables sur Vercel :

```bash
# Variables côté client (NEXT_PUBLIC_*)
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# Variables côté serveur
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_CLIENT_EMAIL
vercel env add FIREBASE_PRIVATE_KEY
```

### Variables Locales

Créez un fichier `.env.local` :

```bash
# Copiez depuis firebase-env.example
cp firebase-env.example .env.local
# Puis éditez .env.local avec vos valeurs
```

## 🚀 Déploiement

### Option 1 : Script Automatique (Recommandé)

```bash
# Afficher les instructions de configuration
./deploy-firebase.sh --setup

# Déploiement complet
./deploy-firebase.sh

# Déploiement sans migration
./deploy-firebase.sh --no-migrate
```

### Option 2 : Déploiement Manuel

```bash
# 1. Installer les dépendances
npm install

# 2. Tester le build
npm run build

# 3. Migrer les données (optionnel)
npx tsx scripts/migrate-to-firebase.ts

# 4. Déployer sur Vercel
vercel --prod
```

## 📊 Migration des Données

### Script de Migration

Le script `scripts/migrate-to-firebase.ts` migre automatiquement :

- ✅ **9 projets** depuis le fichier JSON
- ✅ **Projets vedettes** : Look et Institut Français Togo
- ✅ **Tech Stack** : Arrays natifs Firestore
- ✅ **Timestamps** : Dates de création et mise à jour

### Structure des Données Firestore

```javascript
// Collection: projects
{
  title: "Look",
  description: "Votre boutique de lux en ligne !",
  imageUrl: "/images/look.png",
  platformUrl: "https://look.vr-ai.co",
  techStack: ["Unity", "VR", "C#", "WebXR", "Oculus SDK"],
  isFeatured: true,
  sortOrder: 1,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔍 Vérification

### 1. Vérifier la Migration

```bash
# Tester la connexion Firebase
./maintenance.sh test-db

# Vérifier les logs
./maintenance.sh logs
```

### 2. Vérifier dans Firebase Console

1. Allez dans **Firestore Database**
2. Vérifiez que la collection **"projects"** existe
3. Vérifiez que les 9 projets sont présents
4. Testez les requêtes de lecture/écriture

### 3. Vérifier l'API

```bash
# Tester l'API
curl https://votre-domaine.vercel.app/api/projects
```

## 🔄 Avantages de Firebase

### Performance
- ⚡ **Temps de réponse** : < 100ms
- 🌍 **CDN global** : Données répliquées
- 📱 **Offline-first** : Synchronisation automatique

### Scalabilité
- 📈 **Auto-scaling** : Gestion automatique
- 💰 **Pricing** : Pay-as-you-go
- 🔄 **Real-time** : Mises à jour en temps réel

### Développement
- 🛠️ **SDK** : Intégration facile
- 🔐 **Sécurité** : Règles de sécurité flexibles
- 📊 **Analytics** : Monitoring intégré

## 🚨 Dépannage

### Erreurs Communes

1. **"Firebase App not initialized"**
   - Vérifiez les variables d'environnement
   - Redémarrez le serveur de développement

2. **"Permission denied"**
   - Vérifiez les règles de sécurité Firestore
   - Vérifiez les clés de service

3. **"Collection not found"**
   - Exécutez le script de migration
   - Vérifiez la configuration Firebase

### Commandes Utiles

```bash
# Vérifier la configuration
./maintenance.sh test-db

# Voir les logs
./maintenance.sh logs

# Nettoyer et redéployer
./maintenance.sh clean
./deploy-firebase.sh
```

## 📈 Monitoring

### Firebase Console
- **Usage** : Requêtes, stockage, bande passante
- **Performance** : Temps de réponse, erreurs
- **Sécurité** : Tentatives d'accès, violations

### Vercel Analytics
- **Performance** : Core Web Vitals
- **Usage** : Pages vues, sessions
- **Erreurs** : Logs d'erreur en temps réel

## 🎯 Prochaines Étapes

1. **Configurer Firebase** avec les instructions ci-dessus
2. **Déployer** avec `./deploy-firebase.sh`
3. **Tester** l'application en production
4. **Optimiser** les règles de sécurité
5. **Monitorer** les performances

---

**🔥 Votre portfolio Vr-Ai est maintenant prêt pour Firebase Firestore !**

**URLs importantes :**
- **Portfolio** : https://votre-domaine.vercel.app
- **Firebase Console** : https://console.firebase.google.com
- **API** : https://votre-domaine.vercel.app/api/projects