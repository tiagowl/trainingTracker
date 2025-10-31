# Critérios de Aceitação — App de Treinos de Musculação

## 1) Cadastro de Treinos e Exercícios
- Dado que informo um nome de treino (ex.: "Treino A"), quando salvo, então o treino fica disponível na lista.
- Dado um treino existente, quando adiciono exercícios via input estruturado (nome, repetições, séries, peso), então os exercícios ficam associados ao treino.
- Validações: nome do exercício é obrigatório; repetições, séries e peso aceitam apenas números válidos e limites razoáveis.

## 2) Divisão Livre de Treinos
- Dado que desejo criar múltiplos treinos (A, B, C…), quando adiciono novos treinos, então todos aparecem e podem ser reordenados/renomeados.
- Não há limite artificial baixo (deve suportar pelo menos 20 divisões).

## 3) Check-in de Treino do Dia
- Dado que seleciono um treino para hoje, quando faço check-in, então a sessão é registrada com data/hora e vínculo ao treino.
- Usuário não pode fazer check-in duplicado no mesmo treino e horário.

## 4) Histórico de Treinos Realizados
- Dado que realizo treinos, quando acesso o histórico, então vejo lista com data, hora e treino executado.
- É possível filtrar por período (mês atual, últimos 30 dias) e por treino.

## 5) Prazo de Vencimento por Treino
- Dado um treino, quando defino um prazo em dias (ex.: 14), então o sistema calcula o prazo a partir do último check-in daquele treino.
- Se o prazo expirar sem novo check-in, o treino é marcado como "vencido" para fins de alerta.

## 6) Notificações de Vencimento
- Dado que um treino está próximo de vencer (ex.: <= 2 dias), quando abro o app, então vejo alerta proativo.
- Se um treino estiver vencido, recebo uma notificação clara destacando o último dia que treinei.

## 7) Estatísticas Gerais
- Dado meu histórico, quando acesso estatísticas, então vejo o total de treinos e a contagem do mês atual.
- Gráficos/contadores atualizam ao registrar novo check-in.

## 8) Evolução de Cargas por Exercício
- Dado um exercício (ex.: supino reto), quando abro sua evolução, então vejo série temporal (data x peso) e variações.
- Registros inconsistentes (peso negativo, valores extremos) são ignorados ou sinalizados.

## 9) Edição e Correção de Registros
- Dado um treino/exercício salvo, quando edito, então alterações são persistidas e auditáveis (data de alteração).
- Não é permitido deixar campos obrigatórios vazios após edição.

## 10) Remoção de Treinos/Exercícios
- Dado um treino/exercício que não uso, quando removo, então ele desaparece das listagens e deixa de afetar estatísticas futuras.
- Remoção exige confirmação explícita.


