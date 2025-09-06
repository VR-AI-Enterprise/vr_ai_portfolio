#!/bin/bash

# Script de rollback en production
# Vr-Ai Portfolio - Retour à la version précédente

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

log_info "🔄 Début du rollback en production..."

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI n'est pas installé."
    exit 1
fi

# Lister les déploiements récents
log_info "📋 Déploiements récents:"
vercel ls --limit 5

echo
log_warning "⚠️  ATTENTION: Cette action va restaurer la version précédente en production."
read -p "Êtes-vous sûr de vouloir continuer ? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "Rollback annulé."
    exit 0
fi

# Demander l'URL de déploiement à restaurer
echo
log_info "Entrez l'URL du déploiement à restaurer (ex: vr-ai-portfolio-abc123.vercel.app):"
read -p "URL: " ROLLBACK_URL

if [ -z "$ROLLBACK_URL" ]; then
    log_error "URL invalide."
    exit 1
fi

# Effectuer le rollback
log_info "🔄 Restauration vers: $ROLLBACK_URL"
vercel promote $ROLLBACK_URL --yes

log_success "Rollback terminé !"
log_info "Vérifiez votre site dans quelques minutes."

# Vérification optionnelle
echo
read -p "Voulez-vous vérifier le rollback ? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "🧪 Vérification du rollback..."
    sleep 10  # Attendre que le rollback soit actif
    
    PROD_URL=$(vercel ls | grep -E "vr-ai-portfolio.*production" | awk '{print $2}' | head -1)
    
    if [ ! -z "$PROD_URL" ]; then
        log_info "Test de l'URL: https://$PROD_URL"
        if curl -s "https://$PROD_URL" | grep -q "Vr-Ai Portfolio"; then
            log_success "Site restauré et fonctionnel !"
        else
            log_warning "Site restauré mais vérification échouée."
        fi
    fi
fi

log_success "Rollback terminé ! 🔄"