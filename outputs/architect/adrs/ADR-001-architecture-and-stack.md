# ADR-001: Arquitetura e Stack do MVP

## Contexto
- Requisitos de baixo custo, simplicidade e uso por um único usuário no início.
- Funcionalidades: cadastro de treinos/exercícios, check-in, histórico, estatísticas e alertas in-app.

## Decisão
- Frontend: SPA (React/Vite).
- Backend: Node.js com Express (ou NestJS minimal) em instância gratuita.
- Banco: Postgresql
- Notificações: in-app (sem push) no MVP.

## Consequências
- + Custos baixos e time-to-market rápido.
- + Simplicidade operacional (deploy estático + 1 serviço API).
- − Limitações de concorrência/escala no SQLite; mitigado por migração futura.
- − Sem push notifications inicialmente; depender de alertas in-app.


