#!/bin/bash

# Script para commit das alterações de acessibilidade
# 2ª Vara Cível de Cariacica - Portal de Serviços Digitais

echo "=================================================="
echo "  Commit: VLibras + Google Maps + Tutorial Zoom"
echo "=================================================="

# Adiciona os arquivos modificados
git add App.tsx
git add components/Icons.tsx
git add index.html
git add ACESSIBILIDADE_PLANO.md
git add public/ACESSIBILIDADE_PLANO.md
git add CHANGELOG.md

# Mensagem de commit
COMMIT_MSG="feat(acessibilidade): VLibras, Google Maps, tutorial Zoom e recursos

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

Tutorial Audiências Virtuais:
- Corrigida lógica para exibir tutorial junto com links de download
- Tutorial do Zoom agora aparece abaixo dos botões App Store/Play Store
- Botão 'Como participar da audiência?' com passo a passo expansível
- Dica de antecedência destacada em caixa amarela
- Imagem ilustrativa da videoconferência

Conformidade: CNJ 401/2021, e-MAG 3.1, WCAG 2.2 Nível AA"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "Commit realizado com sucesso!"
echo "Para enviar ao repositório remoto, execute: git push"
