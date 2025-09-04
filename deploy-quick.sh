#!/bin/bash

# 🚀 Script de Déploiement Rapide - Vr-Ai Portfolio
# Usage: ./deploy-quick.sh

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}🚀 Déploiement Rapide - Vr-Ai Portfolio${NC}"

# Build et déploiement
echo -e "${BLUE}[1/3]${NC} Build de production..."
npm run build

echo -e "${BLUE}[2/3]${NC} Déploiement sur Vercel..."
vercel --prod

echo -e "${GREEN}✅ Déploiement rapide terminé !${NC}"