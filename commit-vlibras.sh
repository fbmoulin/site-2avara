#!/bin/bash

# Script para commit das alterações do VLibras e Google Maps
# 2ª Vara Cível de Cariacica - Portal de Acessibilidade

echo "=================================================="
echo "  Commit: VLibras + Google Maps + Acessibilidade"
echo "=================================================="

# Adiciona os arquivos modificados
git add App.tsx
git add components/Icons.tsx
git add index.html
git add ACESSIBILIDADE_PLANO.md
git add public/ACESSIBILIDADE_PLANO.md
git add CHANGELOG.md

# Mensagem de commit
COMMIT_MSG="feat(acessibilidade): VLibras, Google Maps e seção de recursos

Acessibilidade:
- Adicionado widget VLibras do governo federal (LIBRAS)
- Restaurada seção 'Recursos de Acessibilidade' com tutorial completo
- Criado ícone SVG personalizado para VLibras
- Documentados 6 recursos: Fonte, Contraste, Modo Noturno, Teclado, Skip Link, VLibras
- Incluída tabela de atalhos de teclado (padrão e-MAG)

Seção de Contato:
- Restaurado mapa embed do Google Maps (Fórum de Cariacica)
- Restaurado formulário de contato completo
- Link 'Abrir no Google Maps' funcionando

Conformidade: CNJ 401/2021, e-MAG 3.1, WCAG 2.2 Nível AA"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "Commit realizado com sucesso!"
echo "Para enviar ao repositório remoto, execute: git push"
