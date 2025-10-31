# ADR-002: Domínio e Modelo de Dados

## Contexto
- Domínio simples: Treinos (A/B/C…), Exercícios, Sessões (check-ins) e Estatísticas.
- Requisitos de evolução de carga por exercício e cálculo de vencimento por treino.

## Decisão
- Entidades: `Treino`, `Exercicio`, `Sessao`.
- Vencimento computado em leitura: `last(Sessao.treinoId) + Treino.prazoVencimentoDias`.
- Estatísticas geradas por consultas agregadas (sem pré-cálculos no MVP).

## Consequências
- + Simplicidade (sem jobs/batch no MVP).
- + Menor custo de manutenção inicial.
- − Cálculo em leitura pode ter custo em listas grandes; otimizar com índices/materiais no futuro.


