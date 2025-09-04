#!/bin/bash

# 🚀 Script de Déploiement en Production - Vr-Ai Portfolio
# Usage: ./deploy-prod.sh

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}🚀 Vr-Ai Portfolio - Deploy Prod${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Fonction pour vérifier si une commande existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Fonction pour vérifier le statut de connexion Vercel
check_vercel_auth() {
    if ! vercel whoami >/dev/null 2>&1; then
        print_error "Vous n'êtes pas connecté à Vercel. Veuillez exécuter: vercel login"
        exit 1
    fi
}

# Fonction pour sauvegarder l'état actuel
backup_current_state() {
    print_status "Sauvegarde de l'état actuel..."
    
    # Créer un dossier de sauvegarde avec timestamp
    BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Sauvegarder les fichiers importants
    cp .env* "$BACKUP_DIR/" 2>/dev/null || true
    cp package.json "$BACKUP_DIR/" 2>/dev/null || true
    cp vercel.json "$BACKUP_DIR/" 2>/dev/null || true
    
    print_success "Sauvegarde créée dans: $BACKUP_DIR"
}

# Fonction pour nettoyer les fichiers temporaires
cleanup() {
    print_status "Nettoyage des fichiers temporaires..."
    
    # Supprimer les fichiers .env temporaires
    rm -f .env.temp
    rm -f .env.backup
    
    # Nettoyer le cache Next.js
    rm -rf .next
    
    print_success "Nettoyage terminé"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command_exists node; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command_exists npm; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Vercel CLI
    if ! command_exists vercel; then
        print_error "Vercel CLI n'est pas installé. Installez-le avec: npm install -g vercel"
        exit 1
    fi
    
    # Vérifier la connexion Vercel
    check_vercel_auth
    
    print_success "Tous les prérequis sont satisfaits"
}

# Fonction pour installer les dépendances
install_dependencies() {
    print_status "Installation des dépendances..."
    
    npm ci --production=false
    
    print_success "Dépendances installées"
}

# Fonction pour générer le client Prisma
generate_prisma_client() {
    print_status "Génération du client Prisma..."
    
    npx prisma generate
    
    print_success "Client Prisma généré"
}

# Fonction pour tester le build
test_build() {
    print_status "Test du build de production..."
    
    npm run build
    
    if [ ! -d ".next" ]; then
        print_error "Le build a échoué - dossier .next non trouvé"
        exit 1
    fi
    
    print_success "Build de production réussi"
}

# Fonction pour récupérer les variables d'environnement
setup_environment() {
    print_status "Configuration des variables d'environnement..."
    
    # Sauvegarder l'ancien .env s'il existe
    if [ -f ".env" ]; then
        cp .env .env.backup
        print_warning "Ancien .env sauvegardé"
    fi
    
    # Récupérer les variables d'environnement de production
    vercel env pull .env.production --environment=production
    
    if [ ! -f ".env.production" ]; then
        print_error "Impossible de récupérer les variables d'environnement"
        exit 1
    fi
    
    # Utiliser les variables de production pour la migration
    cp .env.production .env
    
    print_success "Variables d'environnement configurées"
}

# Fonction pour synchroniser la base de données
sync_database() {
    print_status "Synchronisation de la base de données..."
    
    npx prisma db push
    
    print_success "Base de données synchronisée"
}

# Fonction pour migrer les données (optionnel)
migrate_data() {
    read -p "Voulez-vous migrer les données depuis le fichier JSON? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Migration des données..."
        
        npx tsx scripts/migrate-projects.ts
        
        print_success "Migration des données terminée"
    else
        print_warning "Migration des données ignorée"
    fi
}

# Fonction pour déployer sur Vercel
deploy_to_vercel() {
    print_status "Déploiement sur Vercel..."
    
    vercel --prod
    
    print_success "Déploiement Vercel terminé"
}

# Fonction pour restaurer l'environnement local
restore_local_env() {
    print_status "Restauration de l'environnement local..."
    
    if [ -f ".env.backup" ]; then
        cp .env.backup .env
        rm .env.backup
        print_success "Environnement local restauré"
    else
        print_warning "Aucun fichier .env de sauvegarde trouvé"
    fi
}

# Fonction pour afficher les URLs de production
show_production_urls() {
    print_status "Récupération des URLs de production..."
    
    # Récupérer l'URL de production depuis Vercel
    PROD_URL=$(vercel ls --scope=emmanuels-projects-fabcf647 | grep "vr-ai-portfolio" | grep "production" | awk '{print $2}' | head -1)
    
    if [ -n "$PROD_URL" ]; then
        echo -e "${CYAN}================================${NC}"
        echo -e "${CYAN}🎉 DÉPLOIEMENT RÉUSSI !${NC}"
        echo -e "${CYAN}================================${NC}"
        echo -e "${GREEN}🚀 Portfolio:${NC} https://$PROD_URL"
        echo -e "${GREEN}🔧 Dashboard:${NC} https://$PROD_URL/dashboard"
        echo -e "${GREEN}📊 API:${NC} https://$PROD_URL/api/projects"
        echo -e "${CYAN}================================${NC}"
    else
        print_warning "Impossible de récupérer l'URL de production"
    fi
}

# Fonction pour afficher les logs de déploiement
show_deployment_logs() {
    print_status "Logs de déploiement récents:"
    
    vercel logs --limit=10
}

# Fonction principale
main() {
    print_header
    
    # Vérifier les arguments
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Afficher cette aide"
        echo "  --no-migrate   Déployer sans migration des données"
        echo "  --logs         Afficher les logs après déploiement"
        echo ""
        echo "Exemples:"
        echo "  $0                    # Déploiement complet"
        echo "  $0 --no-migrate       # Déploiement sans migration"
        echo "  $0 --logs             # Déploiement avec logs"
        exit 0
    fi
    
    # Variables pour les options
    NO_MIGRATE=false
    SHOW_LOGS=false
    
    # Parser les arguments
    for arg in "$@"; do
        case $arg in
            --no-migrate)
                NO_MIGRATE=true
                ;;
            --logs)
                SHOW_LOGS=true
                ;;
        esac
    done
    
    # Exécuter les étapes de déploiement
    check_prerequisites
    backup_current_state
    install_dependencies
    generate_prisma_client
    test_build
    setup_environment
    sync_database
    
    if [ "$NO_MIGRATE" = false ]; then
        migrate_data
    fi
    
    deploy_to_vercel
    restore_local_env
    show_production_urls
    
    if [ "$SHOW_LOGS" = true ]; then
        show_deployment_logs
    fi
    
    cleanup
    
    print_success "🎉 Déploiement en production terminé avec succès !"
}

# Gestion des erreurs
trap 'print_error "Erreur détectée. Nettoyage en cours..."; cleanup; exit 1' ERR

# Exécuter le script principal
main "$@"