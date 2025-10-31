# Backlog Priorizado — App de Treinos de Musculação

Método: Valor x Esforço (alto valor e baixo/médio esforço primeiro), dependências e risco.

## P0 — Essencial (MVP)
1. Cadastro de treinos e exercícios (valor: alto, esforço: médio)
2. Divisão livre de treinos A/B/C… (valor: alto, esforço: baixo)
3. Check-in do treino do dia (valor: alto, esforço: baixo/médio)
4. Histórico de treinos (valor: alto, esforço: baixo)

## P1 — Importante
5. Estatísticas gerais (total e por mês) (valor: médio/alto, esforço: médio)
6. Evolução de cargas por exercício (valor: alto para avançados, esforço: médio/alto)

## P2 — Diferenciais e Retenção
7. Prazo de vencimento por treino (valor: médio, esforço: baixo)
8. Notificações de vencimento (valor: médio/alto, esforço: médio; depende de 7)

## P3 — Manutenibilidade e UX
9. Edição e correção de registros (valor: médio, esforço: baixo/médio)
10. Remoção de treinos/exercícios (valor: médio, esforço: baixo)

## Observações de Dependência
- Notificações (8) dependem de Prazo de vencimento (7) e Histórico/Check-ins (3–4).
- Evolução de cargas (6) depende de Cadastro e histórico consistentes (1, 4).

## Critérios de Pronto (DoD) por item
- Implementado, testado (unitário e funcional), documentado em ajuda in-app, sem regressões.
- Métricas mínimas de UX: operação em até 3 cliques a partir da home (quando aplicável).


