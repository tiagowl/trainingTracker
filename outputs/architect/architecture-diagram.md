# Diagramas de Arquitetura — App de Treinos de Musculação

Base: `outputs/product-owner/requirements.md`, `user-stories.md`, `acceptance-criteria.md`, `backlog.md`.

## Visão Geral (MVP)

```mermaid
graph TD
  U[Usuário Mobile/Web] -->|HTTPS| FE[Frontend SPA]
  FE -->|REST/JSON| BE[Backend API]
  BE --> DB[(Banco de Dados)]
  BE --> NTFY[(Serviço de Notificações)]
```

- Frontend: SPA mobile-first (ex.: React/Vite) hospedado estático.
- Backend: API simples (ex.: Node/Express ou NestJS) com endpoints de treinos, exercícios, sessões e estatísticas.
- DB: relacional leve (ex.: PostgreSQL).
- Notificações: inicialmente in-app (alertas), evoluindo para push quando houver infra.

## Componentes Principais

```mermaid
graph LR
  subgraph Frontend
    A[Home/Check-in]
    B[Listagem de Treinos]
    C[Detalhe do Treino]
    D[Registro de Sessão]
    E[Histórico]
    F[Estatísticas]
    G[Evolução por Exercício]
  end

  subgraph Backend
    API[(REST API)]
    SVC_T[Service: Treinos]
    SVC_E[Service: Exercícios]
    SVC_S[Service: Sessões]
    SVC_ST[Service: Estatísticas]
    SVC_N[Service: Notificações]
    REP[Repositorios]
  end

  subgraph Data
    DB[(Relacional)]
  end

  A-->API
  B-->API
  C-->API
  D-->API
  E-->API
  F-->API
  G-->API

  API-->SVC_T
  API-->SVC_E
  API-->SVC_S
  API-->SVC_ST
  API-->SVC_N
  SVC_T-->REP
  SVC_E-->REP
  SVC_S-->REP
  SVC_ST-->REP
  REP-->DB
```

## Modelo de Dados (simplificado)

```mermaid
classDiagram
  class Treino {
    +id: UUID
    +nome: string
    +prazoVencimentoDias: int
    +createdAt: datetime
  }
  class Exercicio {
    +id: UUID
    +treinoId: UUID
    +nome: string
    +series: int
    +repeticoes: int
    +peso: float
  }
  class Sessao {
    +id: UUID
    +treinoId: UUID
    +dataHora: datetime
  }

  Treino <|-- Exercicio
  Treino <|-- Sessao
```

## Fluxos Críticos
- Check-in: Home → POST /sessoes → sucesso → atualizar histórico e estatísticas.
- Cadastro: POST /treinos, POST /exercicios → consistência via validações de domínio.
- Estatísticas: GET /estatisticas?periodo=mes → agregações simples por período.
- Vencimento: cálculo em leitura (última sessão + prazo), alertas in-app.

## Escalabilidade e Custos
- Estático + API básica → baixo custo inicial (orçamento gratuito).
- DB: Postgres;
- Notificações push adicionadas em fase posterior.


