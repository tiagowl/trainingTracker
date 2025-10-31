import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../infra/db/prisma';

export const router = Router();

const exercicioSchema = z.object({
  nome: z.string().min(1),
  series: z.number().int().min(1).max(20),
  repeticoes: z.number().int().min(1).max(100),
  peso: z.number().nonnegative()
});

router.get('/', async (_req, res, next) => {
  try {
    const list = await prisma.exercicio.findMany({ orderBy: { nome: 'asc' }, include: { treino: true } });
    res.json(list);
  } catch (e) { next(e); }
});

router.get('/treino/:treinoId', async (req, res, next) => {
  try {
    const treinoId = req.params.treinoId;
    const list = await prisma.exercicio.findMany({ where: { treinoId }, orderBy: { nome: 'asc' } });
    res.json(list);
  } catch (e) { next(e); }
});

router.post('/treino/:treinoId', async (req, res, next) => {
  try {
    const treinoId = req.params.treinoId;
    const input = exercicioSchema.parse(req.body);
    const created = await prisma.exercicio.create({ data: { ...input, treinoId } });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const input = exercicioSchema.partial().parse(req.body);
    const updated = await prisma.exercicio.update({ where: { id }, data: input });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.exercicio.delete({ where: { id } });
    res.status(204).send();
  } catch (e) { next(e); }
});
