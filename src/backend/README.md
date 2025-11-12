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

## 🚀 Deploy na Vercel

### Pré-requisitos
1. Conta na Vercel (https://vercel.com)
2. Banco de dados PostgreSQL (ex: Supabase, Railway, Neon, etc.)
3. Variáveis de ambiente configuradas

### Configuração

#### 1. Variáveis de Ambiente na Vercel
Configure as seguintes variáveis no dashboard da Vercel (Settings → Environment Variables):
- `DATABASE_URL`: URL de conexão do PostgreSQL
- `NODE_ENV`: `production`

#### 2. Deploy via CLI

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Navegar para o diretório do backend
cd src/backend

# 3. Login na Vercel
vercel login

# 4. Deploy (primeiro deploy)
vercel

# 5. Deploy em produção
vercel --prod
```

#### 3. Deploy via GitHub Integration

1. Conecte seu repositório no dashboard da Vercel
2. Configure o projeto:
   - **Root Directory**: `src/backend`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: (deixe vazio ou `dist`)
   - **Install Command**: `npm install`
3. Adicione as variáveis de ambiente
4. Faça o deploy

### Migrações do Prisma

Após o primeiro deploy, execute as migrações no banco de dados:

```bash
# Via CLI local (com DATABASE_URL configurada)
npm run prisma:deploy

# Ou via script no Vercel (se configurado)
# Adicione um build command ou script de post-deploy
```

### Notas Importantes

- A Vercel usa serverless functions, então o servidor não fica rodando continuamente
- O handler serverless está em `api/index.ts`
- O script `vercel-build` gera o Prisma Client e compila o TypeScript
- Certifique-se de que o `DATABASE_URL` está configurado corretamente
- A primeira requisição pode ser mais lenta (cold start)

### Estrutura de Deploy

```
src/backend/
├── api/
│   └── index.ts          # Handler serverless para Vercel
├── src/                  # Código fonte
├── vercel.json           # Configuração da Vercel
├── package.json          # Scripts e dependências
└── prisma/               # Schema e migrações do Prisma
```

