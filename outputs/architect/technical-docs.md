# Documentação Técnica — App de Treinos de Musculação

## Objetivos Técnicos
- Entregar MVP de baixo custo e alta simplicidade.
- Garantir fluidez no check-in e consistência dos dados.

## Arquitetura
- Frontend SPA (React/Vite) mobile-first, hospedado em (ex.: GitHub Pages, Netlify, Vercel).
- Backend API (Node/Express ou NestJS) em instância leve (ex.: Render/Free, Railway/Free, Vercel Functions).
- Banco: Postgres.
- Notificações: in-app no MVP; push futuramente.

## Endpoints (proposta)
- Treinos
  - POST /treinos { nome, prazoVencimentoDias }
  - GET /treinos
  - PATCH /treinos/:id { nome, prazoVencimentoDias }
  - DELETE /treinos/:id
- Exercícios
  - POST /treinos/:treinoId/exercicios { nome, series, repeticoes, peso }
  - PATCH /exercicios/:id { nome, series, repeticoes, peso }
  - DELETE /exercicios/:id
- Sessões (Check-in)
  - POST /sessoes { treinoId, dataHora? }
  - GET /sessoes?periodo=mes&treinoId?
- Estatísticas
  - GET /estatisticas?periodo=mes → { totalMes, totalGeral }
  - GET /estatisticas/exercicio/:id → série temporal { data, peso }

## Validações e Regras
- Exercício: nome obrigatório; séries/reps/peso numéricos e plausíveis.
- Sessão: não duplicar mesma data/hora por treino; server-side decide timestamp padrão.
- Vencimento: calculado por (última sessão + prazo), sem job no MVP.

## Dados
- Tabelas: treinos, exercicios, sessoes. Índices por foreign keys e datas.
- Migrações: ferramenta leve (ex.: Prisma Migrate ou Knex).

## Segurança e Privacidade
- MVP single-user: sem autenticação; proteger endpoints por secret simples no backend (opcional) quando exposto.
- Sanitização e validação server-side; CORS restrito ao domínio do frontend.

## Observabilidade
- Logs estruturados no backend (requestId, nível, tempo de resposta).
- Métricas simples: contagem de check-ins/dia.

## NFRs (derivados dos requisitos)
- Desempenho: check-in < 300ms (server), histórico mês < 1s.
- Disponibilidade: 99% em serviços gratuitos (best-effort).
- Manutenibilidade: camadas services/repos isoladas; testes unitários básicos.

## Roadmap Técnico
- Fase 1: CRUDs + check-in + histórico + estatísticas básicas.
- Fase 2: evolução de carga; vencer/alertas in-app.
- Fase 3: push notifications + Postgres + auth (se multiusuário).


