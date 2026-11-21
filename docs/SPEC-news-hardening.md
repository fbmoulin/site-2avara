# Spec — Endurecimento do módulo de notícias (TJES)

**Status:** proposta, nada implementado · **Data:** 2026-11-21
**Escopo:** `backend/src/routes/news.routes.ts`, `backend/src/services/news.service.ts`, `backend/src/scheduler.ts`, `backend/tsconfig.json` e pontos de apoio (`replitAuth.ts`, `rateLimiter.ts`, `server.ts`, `schema.prisma`).

## 1. Como a análise foi feita

- Leitura do código das rotas, serviço, agendador, middleware de auth, rate limiter, `server.ts`, `prod-server.js` e schema Prisma.
- Reprodução: as rotas reais foram montadas num Express contra um Postgres 16 local descartável, com `axios.get` substituído por um feed sintético no formato WordPress. Os resultados estão citados em cada item como **Reproduzido**.
- `tsc --noEmit` do backend nos modos `bundler` e `NodeNext`.
- Pesquisa em documentação (fontes no fim).

**Não verificado:** o formato real do feed do TJES e a resposta do `r.jina.ai` — a rede desta sessão bloqueia os dois hosts. Tudo que depende do formato real está marcado como hipótese.

## 2. Resumo

| # | Achado | Confirmação | Gravidade |
|---|--------|-------------|-----------|
| 1 | `POST /api/news/refresh` público | Reproduzido | Alta |
| 2 | `limit` negativo fura o teto | Reproduzido | Média |
| 3 | `/status` conta o fallback como dado real | Reproduzido | Média |
| 4 | Busca que salva 0 itens retorna sucesso | Reproduzido | Média |
| 5 | Fallback HTML duplica e reordena | Reproduzido (feed sintético) | Média |
| 6 | `lastFetch` não avança | Reproduzido | Baixa |
| 7 | Backoff devolve 500 e não pode ser forçado | Reproduzido | Baixa |
| 8 | Data no fuso do servidor | Reproduzido | Baixa |
| 9 | Vários `PrismaClient` | Confirmado por leitura (4, não 2) | Baixa |
| 10 | `tsc` aceita import sem `.js` | Reproduzido | Baixa |
| A | Entidades HTML do WordPress não decodificadas | Reproduzido (feed sintético) | Baixa |
| B | CORS aceita origem que apenas *contém* `.replit.dev` | Confirmado por leitura | Média |

## 3. Análise e requisitos por item

### 1. Refresh público — `news.routes.ts:52`

**Evidência.** `POST /api/news/refresh` sem cookie respondeu `200 "10 notícias atualizadas com sucesso"`. Vinte chamadas simultâneas geraram vinte buscas externas: não há trava de concorrência. O único freio é o `apiLimiter` geral (100 req/min por IP).

**O que a análise acrescentou ao achado original:**

- **Um anônimo consegue desligar a atualização diária.** O contador de falhas é global e compartilhado com o cron. Três refreshes anônimos durante uma instabilidade do TJES ativam o backoff de 6 h; reproduzido: depois disso, a chamada que o cron das 9h faria retorna `Backoff active` sem tentar nada. O cron só tenta de novo no dia seguinte.
- **O próprio flood pode causar a instabilidade.** O `r.jina.ai` sem chave permite 20 req/min por IP; o limite do site (100/min) está acima disso. Cada refresh com o RSS direto falhando faz até 2 chamadas ao proxy.
- **Custo por chamada:** até 3 requisições externas de 30 s (90 s presos) mais 10 upserts.
- **Ninguém usa a rota.** O frontend só chama `GET /api/news` (`services/newsService.ts`); `/refresh` e `/status` não aparecem em nenhum componente nem no README.

**Requisitos.**

- R1.1 `POST /refresh` exige `isAuthenticated` (mesmo middleware de `article.routes.ts`). Sem sessão: `401`.
- R1.2 Limiter próprio na rota: 3 requisições / 15 min.
- R1.3 *Single-flight* no serviço: se já há uma busca em andamento, chamadas novas (rota, cron ou boot) aguardam a mesma promise em vez de iniciar outra.
- R1.4 O cookie de sessão passa a declarar `sameSite: 'lax'` em `replitAuth.ts` (hoje o atributo é omitido e a proteção contra CSRF depende do padrão de cada navegador).
- R1.5 Documentar a rota no README como autenticada.

**Aceite.** Sem sessão → `401` e zero chamadas externas. Vinte refreshes autenticados simultâneos → uma única rodada de busca. Quarta chamada em 15 min → `429`.

### 2. `limit` negativo — `news.routes.ts:8`

**Evidência.** `?limit=-3` devolveu `03/11, 02/11, 01/11` (as três mais antigas). Com 50 linhas na tabela, `?limit=-1000` devolveu 50 itens; o teto declarado é 20. Causa: `Math.min` só limita por cima, e o Prisma trata `take` negativo como "os últimos N" da ordenação.

**Requisitos.**

- R2.1 Validar a query com Zod (padrão do projeto): inteiro, mínimo 1, máximo 20, padrão 10. Valor inválido cai no padrão em vez de `400`, para não quebrar o ticker.
- R2.2 `getActiveNews` também limita internamente a 1–100, para que nenhum chamador futuro repasse valor negativo.

**Aceite.** `-3`, `0`, `abc`, `1.5` e ausência → nunca mais de 20 itens, sempre os mais recentes primeiro.

### 3. `/status` reporta fallback — `news.routes.ts:35`

**Evidência.** Com a tabela vazia: `newsCount: 3`, `latestNews.id: "fallback-0"`, `success: true`. O mesmo ocorre com o banco fora, porque `getActiveNews` engole o erro e devolve as 3 notícias fixas.

**Requisitos.**

- R3.1 Nova função no serviço (`getNewsStats`) que retorna contagem real (`prisma.news.count`), a notícia mais recente real ou `null`, sem fallback.
- R3.2 `/status` usa essa função. Banco indisponível → `503`.
- R3.3 `GET /api/news` mantém o fallback, mas inclui `fallback: true` na resposta quando os dados são fixos.

**Aceite.** Tabela vazia → `newsCount: 0`, `latestNews: null`. Banco fora → `503`.

### 4. Zero itens salvos = sucesso — `news.service.ts:254`

**Evidência.** Feed com `pubDate` inválido: os 10 upserts falharam e a rota respondeu `200 "0 notícias atualizadas com sucesso"`. Além disso, o contador de falhas é zerado *antes* de salvar (linha 220), então uma queda do banco nunca conta para o backoff.

**Requisitos.**

- R4.1 O parser descarta itens cuja data não é válida.
- R4.2 O resultado passa a ser `{ success, count, failed, source, error? }`. `success` é `false` quando `count === 0`.
- R4.3 O contador de falhas só é zerado depois de pelo menos um item salvo.
- R4.4 Na rota: falha de origem externa → `502`; falha de banco → `500`.

**Aceite.** Feed sem itens válidos ou banco fora → `success: false`, log de erro no cron e falha contabilizada.

### 5. Fallback HTML duplica e reordena — `news.service.ts:88-121`

**Evidência.** Após uma rodada RSS e uma rodada HTML sobre as mesmas 10 notícias, a tabela ficou com 20 linhas (`externalId` `1001…` e `noticia-numero-1…`). O topo de `GET /api/news` virou `1, 10, 9, 8…`, todas com a data de hoje: os itens HTML sobem acima dos reais e fora de ordem, porque recebem `new Date()` como data a cada execução.

**Hipótese a validar em produção:** o `guid` do feed real segue o padrão WordPress `?p=<id>` e o `r.jina.ai` devolve a listagem no formato Markdown que a regex espera.

**Requisitos.**

- R5.1 A chave de deduplicação passa a ser o `link` normalizado (minúsculas, barra final única), igual nos dois caminhos. `link` ganha `@unique`; `externalId` deixa de ser a chave do upsert.
- R5.2 Migration: antes do índice único, remover duplicatas por `link`, mantendo a linha de menor `publishedAt` (a data real do RSS é sempre anterior à data de coleta).
- R5.3 Itens vindos do HTML: no `create`, `publishedAt` = hora da coleta menos o índice na página (preserva a ordem da listagem); no `update`, `publishedAt` não é alterado.
- R5.4 Itens vindos do RSS sempre gravam a data real, inclusive corrigindo uma linha criada antes pelo HTML.

**Aceite.** RSS seguido de HTML sobre as mesmas notícias → mesma contagem de linhas e mesma ordem. HTML seguido de RSS → datas corrigidas, sem linhas novas.

### 6. `lastFetch` parado — `news.service.ts:229`

**Evidência.** Dois refreshes bem-sucedidos com 1,5 s de intervalo: `lastFetch` idêntico. `fetchedAt` só é preenchido pelo `@default(now())` na criação.

**Requisitos.**

- R6.1 `fetchedAt: new Date()` no bloco `update`.
- R6.2 `getFetchStatus` passa a expor `lastAttemptAt`, `lastSuccessAt` e `lastSource` (em memória), exibidos em `/status`.

**Aceite.** Refresh bem-sucedido sem notícia nova → `lastFetch` avança.

### 7. Backoff vira 500 — `news.routes.ts:63`

**Evidência.** Após 3 falhas, com a origem já restabelecida, o refresh seguinte respondeu `500 "Backoff active…"` com zero chamadas externas. O estado fica em memória e só some com reinício ou 6 h.

**Requisitos.**

- R7.1 `fetchAndSaveNews({ force?: boolean })`. O cron e o boot respeitam o backoff; o refresh manual autenticado usa `force: true`.
- R7.2 Quando o backoff bloqueia uma chamada, o resultado traz `retryAfterSeconds` e a rota responde `503` com `Retry-After`.

**Aceite.** Em backoff, refresh autenticado executa a busca; sucesso zera o contador.

### 8. Fuso horário — `news.service.ts:324`

**Evidência.** Notícia de 01:30 UTC (22:30 do dia anterior em Brasília) aparece como dia `05` com `TZ=UTC` e `04` com `TZ=America/Sao_Paulo`. O `.replit` não define `TZ`.

**Requisito.** R8.1 Formatar com `Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit' })`.

**Aceite.** Mesmo resultado com qualquer `TZ` do processo.

### 9. Múltiplos `PrismaClient`

**Evidência.** Em execução há quatro instâncias: `config/database.ts` (singleton, usado pelos controllers), `news.service.ts:4`, `article.routes.ts:6` e `replitAuth.ts:10`. Cada uma abre seu próprio pool.

**Requisito.** R9.1 Os três arquivos importam `prisma` de `config/database.js`. `admin.ts` fica fora (excluído do build).

**Aceite.** `grep "new PrismaClient" backend/src` só retorna `config/database.ts` e `admin.ts`.

### 10. `tsc` não barra import sem extensão — `backend/tsconfig.json`

**Evidência.** Um arquivo de teste com `from './services/news.service'` compila sem erro no modo atual (`bundler`) e falha com `TS2307` em `NodeNext`. O backend inteiro já compila limpo em `NodeNext` hoje.

**Requisito.** R10.1 `"module": "NodeNext"`, `"moduleResolution": "NodeNext"`.

**Aceite.** `npm run build` falha se algum import relativo perder o `.js`.

**Observação.** `openid-client` e `memoizee` estão declarados só no `package.json` da raiz; o backend os encontra subindo diretórios. Funciona com o build atual, mas quebra se o backend for instalado isoladamente. Mover para `backend/package.json` é opcional.

### A. Entidades HTML — `news.service.ts:40`

**Evidência.** Título `Justiça &#038; Cidadania: mutirão &#8216;especial&#8217;` foi gravado como `Justiça &#038; Cidadania: mutirão &#8216;especial'`. A lista fixa de `cleanDescription` não cobre `&#038;` nem `&#8216;`. Se o feed real usa essas entidades é hipótese.

**Requisito.** RA.1 Decodificar entidades numéricas e nomeadas de forma genérica (o `cheerio` já é dependência e não é usado).

### B. CORS — `server.ts:40`

**Evidência.** `origin.includes('.replit.dev')` aceita `https://x.replit.dev.atacante.com`, com `credentials: true`.

**Requisito.** RB.1 Comparar o *hostname* da origem com `endsWith('.replit.dev')`.

## 4. Ordem de implementação sugerida

1. **Segurança:** itens 1, 2 e B.
2. **Correção de dados:** itens 5 (com migration), 4 e A.
3. **Observabilidade:** itens 3, 6, 7 e 8.
4. **Higiene:** itens 9 e 10.

Cada etapa cabe num PR próprio. A única com mudança de schema é a 2.

## 5. Testes

O backend não tem nenhum teste hoje. Proposta: `node:test` executado via `tsx`, com `axios.get` substituído e um Postgres de teste, cobrindo os critérios de aceite acima. O script de reprodução usado nesta análise serve de base.

## 6. Pontos em aberto

1. **Remover em vez de proteger?** Como nada chama `/refresh`, apagar a rota é a opção mais simples. A spec assume proteger, para manter o refresh manual pelo admin.
2. **`/status` deve ser público?** Expõe só contadores; a spec mantém público.
3. **Formato real do feed e do proxy** (itens 5 e A): conferir uma resposta real antes de implementar.
4. **Rate limit por IP em produção:** o backend usa `trust proxy: 1` atrás do `prod-server.js`, que não acrescenta `X-Forwarded-For`. Vale confirmar que `req.ip` é o IP do visitante e não um endereço compartilhado.
5. **Chave do `r.jina.ai`:** com chave o limite sobe de 20 para 500 req/min; seria mais um segredo de backend.

## Fontes

- [Prisma — Pagination (take negativo)](https://docs.prisma.io/docs/v6/orm/prisma-client/queries/pagination)
- [Jina Reader — limites de uso](https://jina.ai/reader)
- [TypeScript — Choosing Compiler Options](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html)
- [TypeScript — moduleResolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html)
- [WordPress Trac #9280 — guid `?p=` com `isPermaLink="false"`](https://core.trac.wordpress.org/ticket/9280)
