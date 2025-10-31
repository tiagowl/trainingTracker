# Wireframes — App de Treinos de Musculação

Base: `user-stories.md`, `acceptance-criteria.md`, `backlog.md`.

## Telas Principais

### 1) Home — Treino do Dia
- Header: status do treino do dia (nome, A/B/C…); chip "Vencendo/Vencido" se aplicável.
- Botão primário: "Fazer Check-in" (1 clique).
- Acesso rápido: "Histórico", "Estatísticas".

Fluxo: Home → Check-in → Registro de exercícios → Finalizar.

### 2) Lista de Treinos (A/B/C…)
- Lista com cartões dos treinos (nome, prazo, último check-in).
- Ações: criar novo, renomear, reordenar.

### 3) Detalhe do Treino (Exercícios)
- Lista de exercícios (nome, séries, repetições, peso sugerido).
- Ação: adicionar/editar/remover exercício.
- Botão: "Iniciar treino" (equivalente ao check-in a partir desta tela).

### 4) Registro de Exercícios (Sessão)
- Para cada exercício: inputs rápidos
  - Séries (incremento rápido), Reps (chips 8/10/12), Peso (teclado numérico)
- Feedback de progresso: X/Y exercícios concluídos.
- Ação: "Finalizar treino".

### 5) Histórico
- Lista cronológica: data/hora, treino, duração (opcional), resumo de cargas.
- Filtros: período (mês atual/últimos 30 dias), treino.

### 6) Estatísticas
- Cartões: total no mês, total no ano.
- Gráfico simples: evolução de treinos por semana.
- Link: "Evolução por exercício".

### 7) Evolução por Exercício
- Seletor de exercício → gráfico (data x peso), variação percentual.
- Observações de outliers.

## Estados e Feedback
- Vencendo: alerta amarelo; Vencido: alerta vermelho + CTA "Retomar".
- Sucesso de check-in: toast + atualização em tempo real do histórico/estatísticas.

## Notas de Acessibilidade
- Contraste AA, foco visível, áreas de toque ≥ 44px.

## Entregáveis
- Wireframes de baixa fidelidade das telas 1–7 (ferramenta sugerida: Figma).


