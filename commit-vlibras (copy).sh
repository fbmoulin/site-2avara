#!/bin/bash

# Script para commit das alterações de acessibilidade
# 2ª Vara Cível de Cariacica - Portal de Serviços Digitais

echo "=================================================="
echo "  Commit: Acessibilidade Completa"
echo "=================================================="

# Adiciona os arquivos modificados
git add App.tsx
git add components/Icons.tsx
git add index.html
git add ACESSIBILIDADE_PLANO.md
git add public/ACESSIBILIDADE_PLANO.md
git add CHANGELOG.md

# Mensagem de commit
COMMIT_MSG="feat(acessibilidade): VLibras, Google Maps, tutorial Zoom e navegação

Acessibilidade (CNJ 401/2021):
- Widget VLibras do governo federal para tradução em LIBRAS
- Seção 'Recursos de Acessibilidade' com tutorial completo
- Ícone SVG personalizado para VLibras
- 6 recursos documentados: Fonte, Contraste, Modo Noturno, Teclado, Skip Link, VLibras
- Tabela de atalhos de teclado (padrão e-MAG)
- Botão ACESSIBILIDADE agora navega para seção de recursos

Seção de Contato:
- Mapa embed do Google Maps (Fórum de Cariacica)
- Formulário de contato completo
- Link 'Abrir no Google Maps'

Tutorial Audiências Virtuais (Zoom):
- Tutorial exibido junto com links de download do app
- Botão 'Como participar da audiência?' expansível
- Passo a passo em 5 etapas
- Dica de antecedência destacada
- Imagem ilustrativa da videoconferência

Conformidade: CNJ 401/2021, e-MAG 3.1, WCAG 2.2 Nível AA"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "Commit realizado com sucesso!"
echo "Para enviar ao repositório remoto, execute: git push"
