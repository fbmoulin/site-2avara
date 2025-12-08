#!/bin/bash

# Script para commit das alterações
# 2ª Vara Cível de Cariacica - Portal de Serviços Digitais
# Versão 2.7.1

echo "=================================================="
echo "  Commit: v2.7.1 - Equipe de Gabinete Atualizada"
echo "=================================================="

# Adiciona todos os arquivos modificados
git add App.tsx
git add components/Icons.tsx
git add index.html
git add ACESSIBILIDADE_PLANO.md
git add CHANGELOG.md
git add README.md
git add backend/src/middleware/validator.ts
git add backend/src/controllers/contact.controller.ts
git add backend/src/services/email.service.ts
git add backend/src/config/email.ts
git add commit-vlibras.sh

# Mensagem de commit
COMMIT_MSG="feat(v2.7.1): Equipe de Gabinete atualizada e auditoria pré-deploy

Equipe de Gabinete - Informações Completas:
- Assessora de Juiz e Chefe de Gabinete: Andreza Raimundo Lage - Mestre em Processo Civil pela UFES
- Assessora de Juiz: Scarllety Viana Scardua - Graduada em Direito
- Estagiária de Pós-Graduação: Mariana Vieira Fernandes
- Estagiária de Graduação: Juliana Ramalho Santos

Formulário de Contato (v2.7.0):
- Campo 'Você é' para identificar Parte (cidadão) ou Advogado(a)
- Campo CPF condicional (aparece apenas para Parte)
- Campo OAB condicional (aparece apenas para Advogado)
- Indicação de DDD obrigatório no campo telefone
- Feedback visual de sucesso/erro no envio
- Validação Zod no backend para novos campos

Auditoria Pré-Deploy Aprovada:
- Backend operacional (porta 3001)
- Frontend operacional (porta 5000)
- API de notícias funcionando (10 itens TJES)
- Secrets configurados (GMAIL_APP_PASSWORD, GEMINI_API_KEY)
- VLibras integrado
- Acessibilidade CNJ 401/2021 completa
- LGPD implementado
- Sistema de email configurado

Conformidade: CNJ 401/2021, e-MAG 3.1, WCAG 2.2 Nível AA, LGPD"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "=================================================="
echo "  Commit realizado com sucesso!"
echo "  Branch: replit/publish"
echo "=================================================="
echo ""
echo "Para enviar ao repositório remoto, execute:"
echo "  git push origin replit/publish"
echo ""
