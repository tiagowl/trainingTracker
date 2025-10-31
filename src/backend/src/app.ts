import express from 'express';
import cors from 'cors';
import { router as treinoRouter } from './api/routes/treinos';
import { router as exercicioRouter } from './api/routes/exercicios';
import { router as sessaoRouter } from './api/routes/sessoes';
import { router as estatisticasRouter } from './api/routes/estatisticas';
import { router as notificacoesRouter } from './api/routes/notificacoes';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/treinos', treinoRouter);
app.use('/exercicios', exercicioRouter);
app.use('/sessoes', sessaoRouter);
app.use('/estatisticas', estatisticasRouter);
app.use('/notificacoes', notificacoesRouter);

app.use(errorHandler);
