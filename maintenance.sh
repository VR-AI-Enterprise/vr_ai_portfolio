#!/bin/bash

# Script de maintenance et gestion des déploiements
# Vr-Ai Portfolio - Outils de maintenance

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

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

log_header() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Menu principal
show_menu() {
    echo
    log_header "Vr-Ai Portfolio - Maintenance"
    echo
    echo "1. 🚀 Déployer en production"
    echo "2. 🧪 Vérifier la production"
    echo "3. 🔄 Rollback"
    echo "4. 📊 Statut des déploiements"
    echo "5. 🔍 Logs de production"
    echo "6. 🧹 Nettoyage local"
    echo "7. 🔧 Vérification locale"
    echo "8. 📋 Informations projet"
    echo "9. ❌ Quitter"
    echo
}

# Fonction pour déployer
deploy_production() {
    log_info "Lancement du déploiement en production..."
    ./deploy-prod.sh
}

# Fonction pour vérifier
verify_production() {
    log_info "Vérification de la production..."
    ./verify-prod.sh
}

# Fonction pour rollback
rollback_production() {
    log_info "Lancement du rollback..."
    ./rollback-prod.sh
}

# Fonction pour afficher le statut
show_status() {
    log_info "Statut des déploiements Vercel:"
    echo
    vercel ls --limit 10
    echo
    log_info "Variables d'environnement:"
    vercel env ls production
}

# Fonction pour afficher les logs
show_logs() {
    log_info "Logs de production (dernières 50 lignes):"
    echo
    vercel logs --limit 50
}

# Fonction de nettoyage
cleanup_local() {
    log_info "Nettoyage des fichiers locaux..."
    rm -rf .next
    rm -rf node_modules/.cache
    rm -rf .vercel
    log_success "Nettoyage terminé"
}

# Fonction de vérification locale
verify_local() {
    log_info "Vérification locale..."
    echo
    
    # Vérifier TypeScript
    log_info "TypeScript..."
    npx tsc --noEmit && log_success "TypeScript OK" || log_error "Erreur TypeScript"
    
    # Vérifier ESLint
    log_info "ESLint..."
    npx eslint . --ext .ts,.tsx --max-warnings 0 && log_success "ESLint OK" || log_error "Erreur ESLint"
    
    # Test de build
    log_info "Test de build..."
    npm run build && log_success "Build OK" || log_error "Erreur de build"
}

# Fonction pour afficher les informations du projet
show_project_info() {
    log_info "Informations du projet:"
    echo
    
    # Package.json info
    echo "📦 Dépendances principales:"
    cat package.json | jq '.dependencies | keys[]' | head -10
    
    echo
    echo "🔧 Scripts disponibles:"
    cat package.json | jq '.scripts'
    
    echo
    echo "🌐 Environnement:"
    if [ -f ".env.production" ]; then
        echo "   • .env.production: ✅ Présent"
    else
        echo "   • .env.production: ❌ Manquant"
    fi
    
    if [ -f ".env.local" ]; then
        echo "   • .env.local: ✅ Présent"
    else
        echo "   • .env.local: ❌ Manquant"
    fi
    
    echo
    echo "📁 Structure du projet:"
    echo "   • src/: $(find src -name "*.tsx" -o -name "*.ts" | wc -l) fichiers TypeScript"
    echo "   • public/: $(find public -type f | wc -l) fichiers publics"
    echo "   • scripts/: $(find scripts -name "*.ts" -o -name "*.js" | wc -l) scripts"
}

# Boucle principale
while true; do
    show_menu
    read -p "Choisissez une option (1-9): " choice
    
    case $choice in
        1)
            deploy_production
            ;;
        2)
            verify_production
            ;;
        3)
            rollback_production
            ;;
        4)
            show_status
            ;;
        5)
            show_logs
            ;;
        6)
            cleanup_local
            ;;
        7)
            verify_local
            ;;
        8)
            show_project_info
            ;;
        9)
            log_info "Au revoir ! 👋"
            exit 0
            ;;
        *)
            log_error "Option invalide. Choisissez entre 1 et 9."
            ;;
    esac
    
    echo
    read -p "Appuyez sur Entrée pour continuer..."
done