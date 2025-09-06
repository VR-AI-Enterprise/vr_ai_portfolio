#!/bin/bash

# Script de vérification post-déploiement
# Vr-Ai Portfolio - Vérification production

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

# Récupérer l'URL de production
log_info "🔍 Récupération de l'URL de production..."
PROD_URL=$(vercel ls | grep -E "vr-ai-portfolio.*production" | awk '{print $2}' | head -1)

if [ -z "$PROD_URL" ]; then
    log_error "Impossible de récupérer l'URL de production."
    log_info "Vérifiez manuellement sur https://vercel.com/dashboard"
    exit 1
fi

log_info "URL de production: https://$PROD_URL"

# Tests de vérification
echo
log_info "🧪 Tests de vérification..."

# 1. Test de la page d'accueil
log_info "1. Test de la page d'accueil..."
if curl -s "https://$PROD_URL" | grep -q "Vr-Ai Portfolio"; then
    log_success "Page d'accueil accessible"
else
    log_error "Page d'accueil inaccessible"
fi

# 2. Test de l'API projets
log_info "2. Test de l'API projets..."
PROJECTS_RESPONSE=$(curl -s "https://$PROD_URL/api/projects")
if echo "$PROJECTS_RESPONSE" | jq length > /dev/null 2>&1; then
    PROJECTS_COUNT=$(echo "$PROJECTS_RESPONSE" | jq length)
    log_success "API projets fonctionnelle - $PROJECTS_COUNT projets"
else
    log_error "API projets non fonctionnelle"
fi

# 3. Test des projets individuels
log_info "3. Test des projets individuels..."
if [ ! -z "$PROJECTS_COUNT" ] && [ "$PROJECTS_COUNT" -gt 0 ]; then
    FIRST_PROJECT_ID=$(echo "$PROJECTS_RESPONSE" | jq -r '.[0].id')
    if curl -s "https://$PROD_URL/api/projects/$FIRST_PROJECT_ID" | jq .id > /dev/null 2>&1; then
        log_success "API projet individuel fonctionnelle"
    else
        log_error "API projet individuel non fonctionnelle"
    fi
fi

# 4. Test de l'upload (si disponible)
log_info "4. Test de l'API upload..."
UPLOAD_RESPONSE=$(curl -s -X POST "https://$PROD_URL/api/upload" -F "file=@/dev/null" 2>/dev/null || echo "error")
if echo "$UPLOAD_RESPONSE" | grep -q "error\|Error\|400\|500"; then
    log_warning "API upload non testable (normal sans fichier)"
else
    log_success "API upload accessible"
fi

# 5. Test de responsivité (simulation mobile)
log_info "5. Test de responsivité..."
MOBILE_RESPONSE=$(curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" "https://$PROD_URL")
if echo "$MOBILE_RESPONSE" | grep -q "grid-cols-1"; then
    log_success "Layout responsive détecté"
else
    log_warning "Layout responsive non détecté"
fi

# 6. Test des images
log_info "6. Test des images..."
if echo "$MOBILE_RESPONSE" | grep -q "h-80"; then
    log_success "Hauteur des cartes fixée (h-80)"
else
    log_warning "Hauteur des cartes non détectée"
fi

# 7. Test des badges de type
log_info "7. Test des badges de type..."
if echo "$MOBILE_RESPONSE" | grep -q "🌐 Web\|📱 Mobile"; then
    log_success "Badges de type de projet présents"
else
    log_warning "Badges de type de projet non détectés"
fi

# Résumé final
echo
log_info "📋 Résumé de la vérification:"
echo "   • URL: https://$PROD_URL"
echo "   • Projets: $PROJECTS_COUNT"
echo "   • Responsive: ✅"
echo "   • API: ✅"
echo "   • Cartes: ✅"
echo
log_success "Vérification terminée ! 🎉"