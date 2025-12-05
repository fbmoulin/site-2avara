#!/bin/bash

# Script para commit das alterações do VLibras
# 2ª Vara Cível de Cariacica - Portal de Acessibilidade

echo "=================================================="
echo "  Commit: Implementação do VLibras e Acessibilidade"
echo "=================================================="

# Adiciona os arquivos modificados
git add App.tsx
git add components/Icons.tsx
git add index.html
git add ACESSIBILIDADE_PLANO.md
git add public/ACESSIBILIDADE_PLANO.md
git add CHANGELOG.md

# Mensagem de commit
COMMIT_MSG="feat(acessibilidade): implementação do VLibras e restauração da seção de recursos

- Adicionado widget VLibras do governo federal (LIBRAS)
- Restaurada seção 'Recursos de Acessibilidade' com tutorial completo
- Criado ícone SVG personalizado para VLibras
- Documentados 6 recursos: Fonte, Contraste, Modo Noturno, Teclado, Skip Link, VLibras
- Incluída tabela de atalhos de teclado (padrão e-MAG)
- Atualizada documentação de conformidade CNJ 401/2021, e-MAG 3.1, WCAG 2.2

Resolução CNJ nº 401/2021 - Acessibilidade Digital no Judiciário"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "Commit realizado com sucesso!"
echo "Para enviar ao repositório remoto, execute: git push"
