# Plano de Acessibilidade Digital
## 2ª Vara Cível de Cariacica - TJES

**Data de Criação:** 05/12/2024  
**Última Atualização:** 05/12/2024  
**Responsável:** Equipe de Desenvolvimento  

---

## 📋 Sumário

1. [Introdução](#introdução)
2. [Base Legal e Normativa](#base-legal-e-normativa)
3. [Ferramentas Já Implementadas](#ferramentas-já-implementadas)
4. [Ferramentas Pendentes](#ferramentas-pendentes)
5. [Checklist de Conformidade](#checklist-de-conformidade)
6. [Guia de Uso das Ferramentas](#guia-de-uso-das-ferramentas)
7. [Atalhos de Teclado](#atalhos-de-teclado)
8. [Referências](#referências)

---

## Introdução

Este documento detalha o plano de acessibilidade digital do portal da 2ª Vara Cível de Cariacica, em conformidade com as diretrizes do Conselho Nacional de Justiça (CNJ), o Modelo de Acessibilidade em Governo Eletrônico (e-MAG) e as Web Content Accessibility Guidelines (WCAG 2.2).

O objetivo é garantir que todos os cidadãos, independentemente de suas limitações físicas, sensoriais ou cognitivas, possam acessar os serviços e informações disponibilizados pelo portal.

---

## Base Legal e Normativa

### Legislação Brasileira

| Norma | Descrição |
|-------|-----------|
| **Lei nº 13.146/2015** | Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência) |
| **Decreto nº 5.296/2004** | Estabelece normas gerais de acessibilidade para pessoas com deficiência |
| **Lei nº 12.527/2011** | Lei de Acesso à Informação - Art. 8º, §3º, VIII: obriga acessibilidade em sites governamentais |
| **Decreto nº 7.724/2012** | Regulamenta a Lei de Acesso à Informação |

### Normatização do CNJ

| Resolução | Descrição |
|-----------|-----------|
| **Resolução CNJ nº 401/2021** | Principal norma sobre acessibilidade e inclusão no Poder Judiciário |
| **Resolução CNJ nº 335/2020** | Plataforma Digital do Poder Judiciário - exige padrões internacionais de acessibilidade |
| **Resolução CNJ nº 561/2024** | Reforça efetividade da política de acessibilidade |
| **Instrução Normativa 103/2024** | Programa de Acessibilidade e Inclusão do CNJ |

### Padrões Técnicos

| Padrão | Descrição |
|--------|-----------|
| **e-MAG 3.1** | Modelo de Acessibilidade em Governo Eletrônico - Obrigatório para sites governamentais brasileiros |
| **WCAG 2.2** | Web Content Accessibility Guidelines - Padrão internacional do W3C |
| **NBR 9050** | Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos |

---

## Ferramentas Já Implementadas

### 1. Skip Link (Pular para o Conteúdo)
- **Status:** ✅ Implementado
- **Descrição:** Link invisível que aparece ao pressionar Tab, permitindo pular diretamente para o conteúdo principal
- **Benefício:** Usuários de leitores de tela e navegação por teclado podem pular elementos repetitivos

### 2. Barra de Acessibilidade
- **Status:** ✅ Implementado
- **Localização:** Topo da página
- **Descrição:** Barra fixa com todas as ferramentas de acessibilidade centralizadas
- **Componentes:**
  - Atalhos de navegação (Conteúdo, Menu, Rodapé)
  - Controles de tamanho de fonte
  - Alto contraste
  - Modo noturno

### 3. Teclas de Atalho Padrão e-MAG
- **Status:** ✅ Implementado
- **Atalhos disponíveis:**
  - `Alt + 1` → Ir para o conteúdo principal
  - `Alt + 2` → Ir para o menu de navegação
  - `Alt + 3` → Ir para o rodapé

### 4. Controle de Tamanho de Fonte
- **Status:** ✅ Implementado
- **Níveis disponíveis:**
  - **Normal:** Tamanho base (16px)
  - **Grande:** 112.5% (18px)
  - **Extra Grande:** 125% (20px)
- **Localização:** Barra de acessibilidade (botões A, A+, A-)

### 5. Alto Contraste
- **Status:** ✅ Implementado
- **Descrição:** Modo de visualização com fundo preto e texto branco/amarelo
- **Benefício:** Pessoas com baixa visão ou sensibilidade à luz
- **Características:**
  - Fundo totalmente preto
  - Texto em branco
  - Links em amarelo
  - Botões com bordas amarelas
  - Imagens em escala de cinza

### 6. Modo Noturno (Dark Mode)
- **Status:** ✅ Implementado
- **Descrição:** Tema escuro com cores suaves para reduzir fadiga visual
- **Benefício:** Conforto visual em ambientes com pouca luz

### 7. Navegação por Teclado
- **Status:** ✅ Implementado
- **Descrição:** Todos os elementos interativos são acessíveis via teclado
- **Indicadores visuais:** Outline dourado (3px) ao focar elementos
- **Teclas suportadas:**
  - `Tab` → Navegar para o próximo elemento
  - `Shift + Tab` → Navegar para o elemento anterior
  - `Enter` → Ativar elemento focado
  - `Escape` → Fechar modais/menus

### 8. Atributos ARIA
- **Status:** ✅ Implementado
- **Descrição:** Atributos de acessibilidade em todos os elementos interativos
- **Implementações:**
  - `aria-label` em botões e links
  - `aria-current` para indicar página atual
  - `aria-hidden` para elementos decorativos
  - `role` para definir funções de elementos

### 9. Suporte a Reduced Motion
- **Status:** ✅ Implementado
- **Descrição:** Respeita preferência do sistema operacional para reduzir animações
- **Benefício:** Pessoas com distúrbios vestibulares ou epilepsia fotossensível
- **CSS:** `@media (prefers-reduced-motion: reduce)`

### 10. Idioma Definido
- **Status:** ✅ Implementado
- **Código:** `<html lang="pt-br">`
- **Benefício:** Leitores de tela pronunciam corretamente o conteúdo

### 11. VLibras Widget
- **Status:** ✅ Implementado
- **Versão:** 6.0.0
- **Data de Implementação:** 05/12/2024
- **Descrição:** Tradução automática de textos para Língua Brasileira de Sinais (LIBRAS) via avatar 3D animado
- **Implementação:** Widget oficial do governo brasileiro (https://vlibras.gov.br/app/vlibras-plugin.js)
- **Localização:** Botão flutuante no canto inferior direito da página
- **Benefício:** Permite que pessoas surdas acessem o conteúdo do portal através da tradução para LIBRAS
- **Conformidade:** Atende à Resolução CNJ nº 401/2021 (obrigatório para sites do Poder Judiciário)
- **Documentação:** https://vlibras.gov.br/doc/widget
- **Características:**
  - Carregamento dinâmico (não afeta performance inicial)
  - Compatível com modo alto contraste e modo noturno
  - Z-index alto para garantir visibilidade sobre outros elementos

---

## Ferramentas Pendentes

### 1. Leitor de Texto por Voz (Text-to-Speech)
- **Status:** 🔄 Pendente
- **Prioridade:** ALTA
- **Descrição:** Leitura em voz alta do conteúdo da página
- **Benefício:** Pessoas com baixa visão, dislexia ou analfabetismo funcional

### 3. Fonte para Dislexia
- **Status:** 🔄 Pendente
- **Prioridade:** MÉDIA
- **Descrição:** Opção de fonte OpenDyslexic ou similar
- **Benefício:** Facilita leitura para pessoas com dislexia

### 4. Guia de Leitura
- **Status:** 🔄 Pendente
- **Prioridade:** MÉDIA
- **Descrição:** Régua horizontal que acompanha o cursor
- **Benefício:** Ajuda a manter foco na linha de leitura

### 5. Máscara de Leitura
- **Status:** 🔄 Pendente
- **Prioridade:** MÉDIA
- **Descrição:** Destaca área central e escurece resto da tela
- **Benefício:** Reduz distrações visuais

### 6. Destaque de Links
- **Status:** 🔄 Pendente
- **Prioridade:** BAIXA
- **Descrição:** Opção para destacar todos os links com sublinhado e cor diferenciada
- **Benefício:** Facilita identificação de elementos clicáveis

### 7. Tailwind CSS para Produção
- **Status:** 🔄 Pendente
- **Prioridade:** ALTA (Técnico)
- **Descrição:** Migrar de CDN para instalação local via PostCSS
- **Benefício:** Performance e confiabilidade em produção

---

## Checklist de Conformidade

### e-MAG 3.1 - Obrigatório

| Recomendação | Status |
|--------------|--------|
| Respeitar padrões de desenvolvimento web | ✅ |
| Organizar código de forma lógica e semântica | ✅ |
| Identificar idioma principal da página | ✅ |
| Oferecer título descritivo e informativo | ✅ |
| Fornecer alternativa em texto para imagens | ✅ |
| Oferecer contraste mínimo entre fundo e texto | ✅ |
| Permitir redimensionamento de texto | ✅ |
| Associar etiquetas aos campos de formulário | ✅ |
| Fornecer atalhos de teclado (Alt+1, Alt+2, Alt+3) | ✅ |
| Barra de acessibilidade no topo | ✅ |
| Controle de contraste | ✅ |
| Página de acessibilidade | 🔄 Parcial |
| Mapa do site | 🔄 Pendente |

### WCAG 2.2 - Nível AA

| Critério | Status |
|----------|--------|
| 1.1.1 Conteúdo não textual | ✅ |
| 1.3.1 Informações e relações | ✅ |
| 1.4.3 Contraste mínimo | ✅ |
| 1.4.4 Redimensionar texto | ✅ |
| 2.1.1 Teclado | ✅ |
| 2.4.1 Ignorar blocos (skip link) | ✅ |
| 2.4.3 Ordem de foco | ✅ |
| 2.4.7 Foco visível | ✅ |
| 2.4.11 Foco não obscurecido | ✅ |
| 2.5.8 Tamanho do alvo (24x24px) | 🔄 Revisar |
| 3.1.1 Idioma da página | ✅ |
| 3.2.6 Ajuda consistente | 🔄 Pendente |

### CNJ - Resolução 401/2021

| Requisito | Status |
|-----------|--------|
| Leitor de texto por voz | 🔄 Pendente |
| Tradução para LIBRAS | ✅ Implementado (VLibras 6.0.0) |
| Alto contraste | ✅ |
| Fonte ajustável | ✅ |
| Compatibilidade com leitores de tela | ✅ |
| Navegação por teclado | ✅ |

---

## Guia de Uso das Ferramentas

### Como Aumentar o Tamanho da Fonte

1. Localize a **barra de acessibilidade** no topo da página
2. Procure os botões **A**, **A+** e **A-**
3. Clique em **A+** para aumentar ou **A-** para diminuir
4. Clique em **A** para voltar ao tamanho normal

### Como Ativar o Alto Contraste

1. Na barra de acessibilidade, clique em **"Alto Contraste"**
2. A página ficará com fundo preto e texto claro
3. Clique novamente para desativar

### Como Ativar o Modo Noturno

1. Na barra de acessibilidade, clique em **"Modo Noturno"**
2. O tema escuro será aplicado para conforto visual
3. Clique novamente para voltar ao modo claro

### Como Navegar por Teclado

1. Pressione **Tab** para avançar entre elementos
2. Pressione **Shift + Tab** para voltar
3. Pressione **Enter** para ativar botões e links
4. Use os atalhos **Alt + 1**, **Alt + 2**, **Alt + 3** para navegação rápida

### Como Usar o VLibras (Tradução para LIBRAS)

1. Localize o **botão azul do VLibras** no canto inferior direito da tela (pode levar alguns segundos para carregar)
2. Clique no botão para abrir o tradutor
3. **Para traduzir texto específico:** Selecione o texto desejado na página e ele será traduzido automaticamente
4. **Para traduzir a página toda:** Use as opções disponíveis no menu do widget
5. O avatar 3D irá apresentar a tradução em LIBRAS
6. Clique no botão novamente para fechar o tradutor

**Nota:** O VLibras é uma ferramenta oficial do governo brasileiro e pode demorar alguns segundos para carregar completamente, pois utiliza um avatar 3D animado.

---

## Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Alt + 1` | Ir para o conteúdo principal |
| `Alt + 2` | Ir para o menu de navegação |
| `Alt + 3` | Ir para o rodapé |
| `Tab` | Próximo elemento interativo |
| `Shift + Tab` | Elemento anterior |
| `Enter` | Ativar elemento focado |
| `Escape` | Fechar modal ou menu aberto |

**Nota para navegadores:**
- **Firefox:** Use `Alt + Shift + número`
- **Chrome/Edge:** Use `Alt + número`
- **Safari (Mac):** Use `Control + Option + número`

---

## Referências

### Documentação Oficial

- **e-MAG 3.1:** https://emag.governoeletronico.gov.br/
- **WCAG 2.2:** https://www.w3.org/TR/WCAG22/
- **VLibras:** https://vlibras.gov.br/
- **CNJ Acessibilidade:** https://www.cnj.jus.br/gestao-da-justica/acessibilidade-e-inclusao/

### Resoluções CNJ

- **Resolução 401/2021:** https://atos.cnj.jus.br/atos/detalhar/3987
- **Resolução 335/2020:** https://atos.cnj.jus.br/atos/detalhar/3496
- **Resolução 561/2024:** Atualização da política de acessibilidade

### Ferramentas de Teste

- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** Extensão para Chrome/Firefox
- **ASES:** Avaliador de Acessibilidade de Sítios (e-MAG)
- **Lighthouse:** DevTools do Chrome

---

## Contato

Para dúvidas, sugestões ou relatar problemas de acessibilidade:

- **E-mail:** [email da vara]
- **Telefone:** [telefone da vara]
- **Endereço:** Fórum de Cariacica, ES

---

*Este documento será atualizado conforme novas implementações forem realizadas.*
