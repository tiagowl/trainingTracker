import { Router } from 'express';
import { prisma } from '../../infra/db/prisma';

export const router = Router();

// Gerar/atualizar notificações para treinos vencidos
router.post('/gerar', async (_req, res, next) => {
  try {
    const treinos = await prisma.treino.findMany();
    const now = new Date();
    let criadas = 0;

    for (const treino of treinos) {
      const lastSessao = await prisma.sessao.findFirst({
        where: { treinoId: treino.id },
        orderBy: { dataHora: 'desc' }
      });

      if (!lastSessao) {
        // Nunca treinou: verificar se já existe notificação
        const existe = await prisma.notificacao.findFirst({
          where: {
            treinoId: treino.id,
            tipo: 'vencido',
            visualizada: false
          }
        });

        if (!existe) {
          await prisma.notificacao.create({
            data: {
              treinoId: treino.id,
              tipo: 'vencido',
              mensagem: `O treino "${treino.nome}" nunca foi realizado.`
            }
          });
          criadas++;
        }
        continue;
      }

      const diasDesde = Math.floor((now.getTime() - lastSessao.dataHora.getTime()) / (1000 * 60 * 60 * 24));
      const vencido = diasDesde > treino.prazoVencimentoDias;

      if (vencido) {
        // Verificar se já existe notificação não visualizada
        const existe = await prisma.notificacao.findFirst({
          where: {
            treinoId: treino.id,
            tipo: 'vencido',
            visualizada: false
          }
        });

        if (!existe) {
          await prisma.notificacao.create({
            data: {
              treinoId: treino.id,
              tipo: 'vencido',
              mensagem: `O treino "${treino.nome}" venceu há ${diasDesde - treino.prazoVencimentoDias} dia(s). Último treino: ${lastSessao.dataHora.toLocaleDateString()}`
            }
          });
          criadas++;
        }
      }
    }

    res.json({ criadas, message: `${criadas} notificação(ões) criada(s)` });
  } catch (e) {
    next(e);
  }
});

// Buscar notificações não visualizadas
router.get('/', async (_req, res, next) => {
  try {
    const notificacoes = await prisma.notificacao.findMany({
      where: { visualizada: false },
      include: { treino: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(notificacoes);
  } catch (e) {
    next(e);
  }
});

// Contar notificações não visualizadas
router.get('/count', async (_req, res, next) => {
  try {
    const count = await prisma.notificacao.count({
      where: { visualizada: false }
    });
    res.json({ count });
  } catch (e) {
    next(e);
  }
});

// Marcar notificação como visualizada
router.patch('/:id/visualizar', async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.notificacao.update({
      where: { id },
      data: { visualizada: true }
    });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

// Marcar todas como visualizadas
router.patch('/visualizar-todas', async (_req, res, next) => {
  try {
    await prisma.notificacao.updateMany({
      where: { visualizada: false },
      data: { visualizada: true }
    });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

