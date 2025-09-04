#!/bin/bash

# 🔧 Script de Maintenance - Vr-Ai Portfolio
# Usage: ./maintenance.sh [command]

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
    echo -e "${PURPLE}🔧 Maintenance - Vr-Ai Portfolio${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commandes disponibles:"
    echo "  clean           Nettoyer le cache et les fichiers temporaires"
    echo "  build           Tester le build de production"
    echo "  lint            Vérifier le code avec ESLint"
    echo "  type-check      Vérifier les types TypeScript"
    echo "  test-db         Tester la connexion à la base de données"
    echo "  logs            Afficher les logs Vercel"
    echo "  status          Afficher le statut du déploiement"
    echo "  backup          Créer une sauvegarde des données"
    echo "  restore         Restaurer depuis une sauvegarde"
    echo "  help            Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 clean        # Nettoyer le projet"
    echo "  $0 build        # Tester le build"
    echo "  $0 logs         # Voir les logs"
}

# Fonction pour nettoyer le projet
clean_project() {
    print_status "Nettoyage du projet..."
    
    # Nettoyer le cache Next.js
    rm -rf .next
    
    # Nettoyer node_modules (optionnel)
    read -p "Voulez-vous supprimer node_modules et réinstaller? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules
        npm install
        print_success "node_modules réinstallé"
    fi
    
    # Nettoyer les fichiers temporaires
    rm -f .env.temp
    rm -f .env.backup
    rm -f .env.production
    
    print_success "Projet nettoyé"
}

# Fonction pour tester le build
test_build() {
    print_status "Test du build de production..."
    
    npm run build
    
    if [ -d ".next" ]; then
        print_success "Build réussi"
    else
        print_error "Build échoué"
        exit 1
    fi
}

# Fonction pour vérifier le linting
check_lint() {
    print_status "Vérification du code avec ESLint..."
    
    npm run lint
    
    print_success "Linting terminé"
}

# Fonction pour vérifier les types
check_types() {
    print_status "Vérification des types TypeScript..."
    
    npx tsc --noEmit
    
    print_success "Vérification des types terminée"
}

# Fonction pour tester la base de données
test_database() {
    print_status "Test de la connexion à la base de données..."
    
    # Vérifier si on a un fichier .env
    if [ ! -f ".env" ]; then
        print_warning "Aucun fichier .env trouvé. Récupération des variables de production..."
        vercel env pull .env.production --environment=production
        cp .env.production .env
    fi
    
    # Tester la connexion
    npx prisma db push --accept-data-loss
    
    print_success "Connexion à la base de données réussie"
}

# Fonction pour afficher les logs
show_logs() {
    print_status "Logs Vercel récents:"
    
    vercel logs --limit=20
}

# Fonction pour afficher le statut
show_status() {
    print_status "Statut du déploiement:"
    
    vercel ls
}

# Fonction pour créer une sauvegarde
create_backup() {
    print_status "Création d'une sauvegarde..."
    
    BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Sauvegarder les fichiers importants
    cp -r src "$BACKUP_DIR/" 2>/dev/null || true
    cp -r prisma "$BACKUP_DIR/" 2>/dev/null || true
    cp package.json "$BACKUP_DIR/" 2>/dev/null || true
    cp vercel.json "$BACKUP_DIR/" 2>/dev/null || true
    cp .env* "$BACKUP_DIR/" 2>/dev/null || true
    
    print_success "Sauvegarde créée dans: $BACKUP_DIR"
}

# Fonction pour restaurer depuis une sauvegarde
restore_backup() {
    print_status "Sauvegardes disponibles:"
    
    ls -la | grep "backup-"
    
    read -p "Entrez le nom du dossier de sauvegarde à restaurer: " backup_name
    
    if [ -d "$backup_name" ]; then
        print_warning "Cette opération va écraser les fichiers actuels!"
        read -p "Êtes-vous sûr? (y/N): " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cp -r "$backup_name"/* .
            print_success "Sauvegarde restaurée depuis: $backup_name"
        else
            print_warning "Restauration annulée"
        fi
    else
        print_error "Sauvegarde non trouvée: $backup_name"
    fi
}

# Fonction principale
main() {
    print_header
    
    case "${1:-help}" in
        clean)
            clean_project
            ;;
        build)
            test_build
            ;;
        lint)
            check_lint
            ;;
        type-check)
            check_types
            ;;
        test-db)
            test_database
            ;;
        logs)
            show_logs
            ;;
        status)
            show_status
            ;;
        backup)
            create_backup
            ;;
        restore)
            restore_backup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Commande inconnue: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Exécuter le script principal
main "$@"