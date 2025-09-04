#!/bin/bash

# 🗄️ Script de Mise à Jour de la Base de Données - Vr-Ai Portfolio
# Usage: ./update-db.sh

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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
    echo -e "${PURPLE}🗄️ Mise à Jour Base de Données${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Fonction pour vérifier la connexion Vercel
check_vercel_auth() {
    if ! vercel whoami >/dev/null 2>&1; then
        print_error "Vous n'êtes pas connecté à Vercel. Veuillez exécuter: vercel login"
        exit 1
    fi
}

# Fonction pour sauvegarder l'environnement local
backup_local_env() {
    if [ -f ".env" ]; then
        cp .env .env.local.backup
        print_success "Environnement local sauvegardé"
    fi
}

# Fonction pour configurer l'environnement de production
setup_production_env() {
    print_status "Récupération des variables d'environnement de production..."
    
    vercel env pull .env.production --environment=production
    
    if [ ! -f ".env.production" ]; then
        print_error "Impossible de récupérer les variables d'environnement"
        exit 1
    fi
    
    cp .env.production .env
    print_success "Variables d'environnement de production configurées"
}

# Fonction pour synchroniser le schéma
sync_schema() {
    print_status "Synchronisation du schéma de base de données..."
    
    npx prisma db push
    
    print_success "Schéma synchronisé"
}

# Fonction pour migrer les données
migrate_data() {
    print_status "Migration des données..."
    
    npx tsx scripts/migrate-projects.ts
    
    print_success "Données migrées"
}

# Fonction pour restaurer l'environnement local
restore_local_env() {
    if [ -f ".env.local.backup" ]; then
        cp .env.local.backup .env
        rm .env.local.backup
        print_success "Environnement local restauré"
    fi
}

# Fonction pour nettoyer
cleanup() {
    rm -f .env.production
    rm -f .env.local.backup
    print_success "Fichiers temporaires nettoyés"
}

# Fonction principale
main() {
    print_header
    
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Afficher cette aide"
        echo "  --schema-only  Synchroniser uniquement le schéma (pas de migration)"
        echo ""
        echo "Exemples:"
        echo "  $0                    # Mise à jour complète (schéma + données)"
        echo "  $0 --schema-only      # Synchroniser uniquement le schéma"
        exit 0
    fi
    
    check_vercel_auth
    backup_local_env
    setup_production_env
    
    if [ "$1" = "--schema-only" ]; then
        sync_schema
        print_warning "Migration des données ignorée (--schema-only)"
    else
        sync_schema
        migrate_data
    fi
    
    restore_local_env
    cleanup
    
    print_success "🎉 Mise à jour de la base de données terminée !"
}

# Gestion des erreurs
trap 'print_error "Erreur détectée. Nettoyage en cours..."; cleanup; exit 1' ERR

# Exécuter le script principal
main "$@"