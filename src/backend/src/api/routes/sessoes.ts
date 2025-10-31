import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../infra/db/prisma';

export const router = Router();

const createSessaoSchema = z.object({
  treinoId: z.string().uuid(),
  dataHora: z.coerce.date().optional()
});

router.post('/', async (req, res, next) => {
  try {
    const input = createSessaoSchema.parse(req.body);
    const created = await prisma.sessao.create({ data: { treinoId: input.treinoId, dataHora: input.dataHora } });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
  try {
    const periodo = req.query.periodo as string | undefined;
    const treinoId = req.query.treinoId as string | undefined;
    const where: any = {};
    if (treinoId) where.treinoId = treinoId;
    // periodo=mes (últimos 30 dias)
    if (periodo === 'mes') {
      const from = new Date();
      from.setDate(from.getDate() - 30);
      where.dataHora = { gte: from };
    }
    const list = await prisma.sessao.findMany({ where, orderBy: { dataHora: 'desc' }, include: { treino: true } });
    res.json(list);
  } catch (e) { next(e); }
});
