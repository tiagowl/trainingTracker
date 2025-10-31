# Training Tracker Backend

## Requisitos
- Node 18+
- Postgres 14+

## Setup
1. Crie um arquivo `.env` baseado em `.env.example` com `DATABASE_URL` e `PORT`.
2. Instale dependências:
   ```bash
   npm install
   ```
3. **Importante**: Pare o servidor backend se estiver rodando (Ctrl+C)

4. Gere cliente Prisma e rode migrações (dev):
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```
   Se você já tem o banco criado e adicionou o model `Notificacao` depois, rode:
   ```bash
   npm run prisma:migrate -- --name add_notificacoes
   npm run prisma:generate
   ```

5. (Opcional) Execute o seed para popular dados de teste:
   ```bash
   npm run prisma:seed
   ```
   Isso criará 3 treinos de exemplo e 3 notificações de teste.
   
   **Nota**: Se der erro EPERM ao gerar o Prisma Client, certifique-se de que o servidor backend está parado.

## Executar
- Desenvolvimento:
  ```bash
  npm run dev
  ```
- Produção:
  ```bash
  npm run build && npm start
  ```

## Documentação da API
Veja `src/docs/openapi.yaml`.

