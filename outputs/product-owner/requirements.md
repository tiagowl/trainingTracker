# Documentação de Requisitos — App de Treinos de Musculação

## Visão Geral
Aplicativo para registro e acompanhamento de treinos com divisões personalizadas (A/B/C/…), check-in diário, histórico, prazos de vencimento por treino e estatísticas, incluindo evolução de cargas por exercício.

## Escopo Funcional
- Cadastro de treinos e exercícios via input de texto estruturado
- Divisão livre de treinos (A, B, C, …)
- Check-in do treino do dia
- Histórico com dia e horário
- Prazo de vencimento por treino
- Notificações quando o prazo for atingido
- Estatísticas gerais (total e por mês)
- Evolução de carga por exercício
- Edição e remoção de registros

## Requisitos Não Funcionais
- Usabilidade: fluxo simples (até 3 passos) para registrar uma sessão
- Desempenho: registrar check-in em < 300ms locais; listar histórico do mês em < 1s
- Confiabilidade: não perder dados ao editar; confirmações ao remover
- Portabilidade: mobile-first

## Dados Principais
- Treino: id, nome (A/B/C…), prazo_vencimento_dias
- Exercício: id, treino_id, nome, séries, repetições, peso
- Sessão (check-in): id, treino_id, data_hora

## Regras de Negócio
- Um exercício deve ter nome e valores numéricos válidos (séries, repetições, peso)
- Vencimento de treino calculado pelo último check-in + prazo_vencimento_dias
- Notificações exibidas ao abrir o app e/ou via push (quando existir)

## Critérios de Aceitação (Resumo)
Ver `acceptance-criteria.md`.

## Priorização
Ver `backlog.md`.

## Riscos e Premissas
- Risco: input livre pode gerar dados inconsistentes → validar estrutura mínima.
- Premissa: usuário entende a convenção A/B/C e deseja personalizar.

## Métricas
- Frequência mensal de treinos
- Taxa de treinos vencidos por período
- Progressão média de carga por exercício


