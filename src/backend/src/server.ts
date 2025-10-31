import dotenv from 'dotenv';
import { createServer } from 'http';
import { app } from './app';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const server = createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
