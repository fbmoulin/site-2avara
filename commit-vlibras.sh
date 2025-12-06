#!/bin/bash

# Script para commit das alterações
# 2ª Vara Cível de Cariacica - Portal de Serviços Digitais
# Versão 2.7.0

echo "=================================================="
echo "  Commit: v2.7.0 - Formulário Aprimorado"
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

# Mensagem de commit
COMMIT_MSG="feat(v2.7.0): Formulário de contato aprimorado com identificação

Formulário de Contato:
- Campo 'Você é' para identificar Parte (cidadão) ou Advogado(a)
- Campo CPF condicional (aparece apenas para Parte)
- Campo OAB condicional (aparece apenas para Advogado)
- Indicação de DDD obrigatório no campo telefone com placeholder
- Feedback visual de sucesso/erro no envio (ícones e cores)
- Estado de loading com spinner durante envio
- Campos desabilitados durante envio para evitar duplo clique
- Limpeza automática do formulário após envio bem-sucedido

Backend:
- Validação Zod atualizada com novos campos (userType, cpf, oab)
- Email de notificação inclui tipo de usuário e CPF/OAB
- Controller de contato atualizado

Correções:
- Formulário agora usa JavaScript (fetch) em vez de submit HTML tradicional
- Formulário não redireciona mais para página em branco ao enviar

Documentação:
- CHANGELOG.md atualizado com versão 2.7.0
- README.md atualizado com novas funcionalidades e badges

Conformidade: CNJ 401/2021, e-MAG 3.1, WCAG 2.2 Nível AA, LGPD"

# Executa o commit
git commit -m "$COMMIT_MSG"

echo ""
echo "Commit realizado com sucesso!"
echo "Branch atual: replit/publish"
echo "Para enviar ao repositório remoto, execute: git push"
