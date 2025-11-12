import dotenv from 'dotenv';
import { createServer } from 'http';
import { app } from './app';

dotenv.config();

// Para produção local/tradicional (não serverless)
// Na Vercel, o handler serverless em api/index.ts será usado
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  const server = createServer(app);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}

// Export para uso em testes ou outros contextos
export { app };
