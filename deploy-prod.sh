#!/bin/bash

# Script de déploiement complet en production
# Vr-Ai Portfolio - Firebase + Vercel

set -e  # Arrêter le script en cas d'erreur

echo "🚀 Début du déploiement en production..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    log_error "package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI n'est pas installé. Installez-le avec: npm i -g vercel"
    exit 1
fi

# Vérifier que les variables d'environnement sont présentes
if [ ! -f ".env.production" ]; then
    log_error "Fichier .env.production non trouvé. Créez-le avec vos variables Firebase."
    exit 1
fi

log_info "Vérification des prérequis..."

# 1. Nettoyage
log_info "🧹 Nettoyage des fichiers temporaires..."
rm -rf .next
rm -rf node_modules/.cache
log_success "Nettoyage terminé"

# 2. Installation des dépendances
log_info "📦 Installation des dépendances..."
npm ci --production=false
log_success "Dépendances installées"

# 3. Vérification de la syntaxe TypeScript
log_info "🔍 Vérification TypeScript..."
npx tsc --noEmit
log_success "TypeScript OK"

# 4. Linting
log_info "🔍 Vérification ESLint..."
npx eslint . --ext .ts,.tsx --max-warnings 0
log_success "ESLint OK"

# 5. Build de production
log_info "🏗️  Build de production..."
npm run build
log_success "Build terminé"

# 6. Test de l'API locale (optionnel)
log_info "🧪 Test de l'API locale..."
if curl -s "http://localhost:3000/api/projects" > /dev/null 2>&1; then
    log_warning "Serveur local détecté. Arrêtez-le avant de continuer."
    read -p "Voulez-vous continuer ? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Déploiement annulé."
        exit 0
    fi
fi

# 7. Vérification des variables d'environnement Vercel
log_info "🔐 Vérification des variables d'environnement Vercel..."
vercel env ls production > /dev/null 2>&1 || {
    log_error "Impossible de récupérer les variables d'environnement Vercel."
    log_info "Assurez-vous d'être connecté à Vercel: vercel login"
    exit 1
}

# 8. Déploiement sur Vercel
log_info "🚀 Déploiement sur Vercel..."
vercel --prod --yes
log_success "Déploiement Vercel terminé"

# 9. Vérification du déploiement
log_info "🔍 Vérification du déploiement..."
sleep 5  # Attendre que le déploiement soit actif

# Récupérer l'URL de production
PROD_URL=$(vercel ls | grep -E "vr-ai-portfolio.*production" | awk '{print $2}' | head -1)

if [ -z "$PROD_URL" ]; then
    log_warning "Impossible de récupérer l'URL de production automatiquement."
    log_info "Vérifiez manuellement sur https://vercel.com/dashboard"
else
    log_info "URL de production: https://$PROD_URL"
    
    # Test de l'API de production
    log_info "🧪 Test de l'API de production..."
    if curl -s "https://$PROD_URL/api/projects" | jq length > /dev/null 2>&1; then
        PROJECTS_COUNT=$(curl -s "https://$PROD_URL/api/projects" | jq length)
        log_success "API fonctionnelle - $PROJECTS_COUNT projets chargés"
    else
        log_warning "Impossible de tester l'API de production"
    fi
fi

# 10. Nettoyage final
log_info "🧹 Nettoyage final..."
rm -rf .next
log_success "Nettoyage terminé"

# 11. Résumé
echo
log_success "🎉 Déploiement terminé avec succès !"
echo
log_info "📋 Résumé du déploiement:"
echo "   • Build: ✅ Réussi"
echo "   • TypeScript: ✅ Vérifié"
echo "   • ESLint: ✅ Vérifié"
echo "   • Vercel: ✅ Déployé"
if [ ! -z "$PROD_URL" ]; then
    echo "   • URL: https://$PROD_URL"
fi
echo
log_info "🔗 Liens utiles:"
echo "   • Dashboard Vercel: https://vercel.com/dashboard"
echo "   • Firebase Console: https://console.firebase.google.com"
echo "   • Logs Vercel: vercel logs"
echo
log_success "Déploiement terminé ! 🚀"