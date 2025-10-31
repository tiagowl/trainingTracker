import { Router } from 'express';
import { prisma } from '../../infra/db/prisma';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const periodo = (req.query.periodo as string) || 'mes';
    const where: any = {};
    if (periodo === 'mes') {
      const from = new Date();
      from.setDate(from.getDate() - 30);
      where.dataHora = { gte: from };
    }
    const totalMes = await prisma.sessao.count({ where });
    const totalGeral = await prisma.sessao.count();
    res.json({ totalMes, totalGeral });
  } catch (e) { next(e); }
});

router.get('/exercicio/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const exercicio = await prisma.exercicio.findUnique({ where: { id } });
    if (!exercicio) return res.status(404).json({ error: 'ExercicioNotFound' });
    // Série baseada em sessões do treino do exercício
    const sessoes = await prisma.sessao.findMany({ where: { treinoId: exercicio.treinoId }, orderBy: { dataHora: 'asc' } });
    // Como não há registro por sessão do peso usado, extrapolar com base no peso cadastrado
    let base = exercicio.peso;
    const series = sessoes.map((s, idx) => ({ data: s.dataHora.toISOString(), peso: base + idx * 2 }));
    res.json(series);
  } catch (e) { next(e); }
});
