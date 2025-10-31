import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../infra/db/prisma';

export const router = Router();

const createTreinoSchema = z.object({
  nome: z.string().min(1),
  prazoVencimentoDias: z.number().int().min(1).max(365)
});

router.get('/', async (_req, res, next) => {
  try {
    const treinos = await prisma.treino.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(treinos);
  } catch (e) { next(e); }
});

router.get('/status', async (_req, res, next) => {
  try {
    const treinos = await prisma.treino.findMany();
    const now = new Date();
    const results = await Promise.all(treinos.map(async t => {
      const last = await prisma.sessao.findFirst({ where: { treinoId: t.id }, orderBy: { dataHora: 'desc' } });
      const lastDate = last?.dataHora ?? null;
      let daysSince = null as number | null;
      let status: 'ok' | 'vencendo' | 'vencido' = 'ok';
      if (lastDate) {
        const diffMs = now.getTime() - lastDate.getTime();
        daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      } else {
        // nunca treinou: considerar vencido
        status = 'vencido';
        daysSince = null;
      }
      if (daysSince !== null) {
        const remaining = t.prazoVencimentoDias - daysSince;
        if (remaining <= 0) status = 'vencido';
        else if (remaining <= 2) status = 'vencendo';
      }
      return { treinoId: t.id, nome: t.nome, prazoVencimentoDias: t.prazoVencimentoDias, lastSessao: lastDate, daysSince, status };
    }));
    // ordenar: vencido -> vencendo -> ok
    results.sort((a, b) => {
      const rank = (s: string) => (s === 'vencido' ? 0 : s === 'vencendo' ? 1 : 2);
      return rank(a.status) - rank(b.status);
    });
    res.json(results);
  } catch (e) { next(e); }
});

router.get('/:id/exercicios', async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = await prisma.exercicio.findMany({ where: { treinoId: id }, orderBy: { nome: 'asc' } });
    res.json(list);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const input = createTreinoSchema.parse(req.body);
    const treino = await prisma.treino.create({ data: input });
    res.status(201).json(treino);
  } catch (e) { next(e); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const input = createTreinoSchema.partial().parse(req.body);
    const treino = await prisma.treino.update({ where: { id }, data: input });
    res.json(treino);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.treino.delete({ where: { id } });
    res.status(204).send();
  } catch (e) { next(e); }
});
