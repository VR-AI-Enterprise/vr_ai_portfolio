#!/bin/bash

# 🔥 Script de Déploiement Firebase - Vr-Ai Portfolio
# Usage: ./deploy-firebase.sh

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

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
    echo -e "${PURPLE}🔥 Vr-Ai Portfolio - Deploy Firebase${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Fonction pour vérifier les prérequis Firebase
check_firebase_prerequisites() {
    print_status "Vérification des prérequis Firebase..."
    
    # Vérifier Node.js
    if ! command -v node >/dev/null 2>&1; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm >/dev/null 2>&1; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Vercel CLI
    if ! command -v vercel >/dev/null 2>&1; then
        print_error "Vercel CLI n'est pas installé. Installez-le avec: npm install -g vercel"
        exit 1
    fi
    
    # Vérifier la connexion Vercel
    if ! vercel whoami >/dev/null 2>&1; then
        print_error "Vous n'êtes pas connecté à Vercel. Veuillez exécuter: vercel login"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Fonction pour charger les variables d'environnement
load_env_vars() {
    if [ -f ".env" ]; then
        print_status "Chargement des variables d'environnement depuis .env..."
        export $(grep -v '^#' .env | xargs)
        print_success "Variables d'environnement chargées"
    fi
}

# Fonction pour vérifier les variables d'environnement Firebase
check_firebase_env() {
    print_status "Vérification des variables d'environnement Firebase..."
    
    # Charger les variables d'environnement
    load_env_vars
    
    # Vérifier les variables côté client
    if [ -z "$NEXT_PUBLIC_FIREBASE_API_KEY" ]; then
        print_error "NEXT_PUBLIC_FIREBASE_API_KEY n'est pas définie"
        exit 1
    fi
    
    if [ -z "$NEXT_PUBLIC_FIREBASE_PROJECT_ID" ]; then
        print_error "NEXT_PUBLIC_FIREBASE_PROJECT_ID n'est pas définie"
        exit 1
    fi
    
    # Vérifier les variables côté serveur
    if [ -z "$FIREBASE_PROJECT_ID" ]; then
        print_error "FIREBASE_PROJECT_ID n'est pas définie"
        exit 1
    fi
    
    if [ -z "$FIREBASE_CLIENT_EMAIL" ]; then
        print_error "FIREBASE_CLIENT_EMAIL n'est pas définie"
        exit 1
    fi
    
    if [ -z "$FIREBASE_PRIVATE_KEY" ]; then
        print_error "FIREBASE_PRIVATE_KEY n'est pas définie"
        exit 1
    fi
    
    print_success "Variables d'environnement Firebase configurées"
}

# Fonction pour installer les dépendances
install_dependencies() {
    print_status "Installation des dépendances..."
    
    npm ci --production=false
    
    print_success "Dépendances installées"
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

# Fonction pour migrer les données vers Firebase
migrate_to_firebase() {
    read -p "Voulez-vous migrer les données vers Firebase Firestore? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Migration des données vers Firebase..."
        
        npx tsx scripts/migrate-to-firebase.ts
        
        print_success "Migration vers Firebase terminée"
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

# Fonction pour afficher les URLs de production
show_production_urls() {
    print_status "Récupération des URLs de production..."
    
    # Récupérer l'URL de production depuis Vercel
    PROD_URL=$(vercel ls --scope=emmanuels-projects-fabcf647 | grep "vr-ai-portfolio" | grep "production" | awk '{print $2}' | head -1)
    
    if [ -n "$PROD_URL" ]; then
        echo -e "${CYAN}================================${NC}"
        echo -e "${CYAN}🎉 DÉPLOIEMENT FIREBASE RÉUSSI !${NC}"
        echo -e "${CYAN}================================${NC}"
        echo -e "${GREEN}🚀 Portfolio:${NC} https://$PROD_URL"
        echo -e "${GREEN}🔧 Dashboard:${NC} https://$PROD_URL/dashboard"
        echo -e "${GREEN}📊 API:${NC} https://$PROD_URL/api/projects"
        echo -e "${GREEN}🔥 Firebase:${NC} https://console.firebase.google.com"
        echo -e "${CYAN}================================${NC}"
    else
        print_warning "Impossible de récupérer l'URL de production"
    fi
}

# Fonction pour afficher les instructions de configuration Firebase
show_firebase_setup() {
    echo -e "${YELLOW}================================${NC}"
    echo -e "${YELLOW}🔥 Configuration Firebase Requise${NC}"
    echo -e "${YELLOW}================================${NC}"
    echo ""
    echo "1. Allez sur https://console.firebase.google.com"
    echo "2. Créez un nouveau projet ou sélectionnez un projet existant"
    echo "3. Activez Firestore Database"
    echo "4. Allez dans Project Settings > Service Accounts"
    echo "5. Générez une nouvelle clé privée"
    echo "6. Configurez les variables d'environnement sur Vercel:"
    echo ""
    echo "Variables côté client (NEXT_PUBLIC_*):"
    echo "- NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    echo "- NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    echo "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    echo "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "- NEXT_PUBLIC_FIREBASE_APP_ID"
    echo "- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
    echo ""
    echo "Variables côté serveur:"
    echo "- FIREBASE_PROJECT_ID"
    echo "- FIREBASE_CLIENT_EMAIL"
    echo "- FIREBASE_PRIVATE_KEY"
    echo ""
    echo "Utilisez: vercel env add [VARIABLE_NAME]"
    echo -e "${YELLOW}================================${NC}"
}

# Fonction principale
main() {
    print_header
    
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Afficher cette aide"
        echo "  --setup        Afficher les instructions de configuration Firebase"
        echo "  --no-migrate   Déployer sans migration des données"
        echo ""
        echo "Exemples:"
        echo "  $0                    # Déploiement complet avec Firebase"
        echo "  $0 --setup            # Afficher les instructions de configuration"
        echo "  $0 --no-migrate       # Déploiement sans migration"
        exit 0
    fi
    
    if [ "$1" = "--setup" ]; then
        show_firebase_setup
        exit 0
    fi
    
    # Variables pour les options
    NO_MIGRATE=false
    
    # Parser les arguments
    for arg in "$@"; do
        case $arg in
            --no-migrate)
                NO_MIGRATE=true
                ;;
        esac
    done
    
    # Exécuter les étapes de déploiement
    check_firebase_prerequisites
    check_firebase_env
    install_dependencies
    test_build
    
    if [ "$NO_MIGRATE" = false ]; then
        migrate_to_firebase
    fi
    
    deploy_to_vercel
    show_production_urls
    
    print_success "🎉 Déploiement Firebase terminé avec succès !"
}

# Gestion des erreurs
trap 'print_error "Erreur détectée. Arrêt du script..."; exit 1' ERR

# Exécuter le script principal
main "$@"