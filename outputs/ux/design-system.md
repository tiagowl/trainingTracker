# Design System (Inicial) — App de Treinos de Musculação

Baseado nas telas/fluxos de `wireframes.md` e objetivos de `research.md`.

## Fundamentos
- Cores
  - Primária: #2E7D32 (ação positiva)
  - Atenção: #F9A825 (vencendo)
  - Alerta: #D32F2F (vencido)
  - Neutros: #111 (texto), #666 (texto secundário), #EEE (borda), #FAFAFA (fundo)
- Tipografia
  - Títulos: Inter/Bold
  - Corpo: Inter/Regular
  - Tamanhos: 12 / 14 / 16 / 20 / 24
- Espaçamento (8pt system)
  - 4 / 8 / 12 / 16 / 24 / 32 / 48
- Raios: 8
- Elevation: 0 / 2 / 6

## Componentes Principais
- Botão
  - Estados: default, loading, disabled
  - Tamanhos: primário (fill), secundário (outline)
- Input Numérico (Peso)
  - Teclado numérico, validação de faixas
- Chips de Repetições
  - Presets: 8/10/12; selecionável; editável
- Card de Treino
  - Nome, último check-in, status (vencendo/vencido)
- Lista de Exercícios
  - Itens com séries/reps/peso; ação de editar/remover
- Toast/Alertas
  - Sucesso (verde), Atenção (amarelo), Erro (vermelho)

## Padrões de Interação
- Check-in em 1 clique; feedback imediato
- Edição inline com confirmação explícita
- Filtros visíveis com indicação de estado ativo

## Acessibilidade
- Contraste mínimo AA
- Targets ≥ 44px
- Leitura por screen reader de status (vencido/vencendo)

## Documentação
- Nomeação consistente em componentes
- Tokens exportáveis (cores, tipografia, espaçamento)


