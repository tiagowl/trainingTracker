import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (opcional - comentar se quiser manter dados)
  // await prisma.notificacao.deleteMany({});
  // await prisma.sessao.deleteMany({});
  // await prisma.exercicio.deleteMany({});
  // await prisma.treino.deleteMany({});

  // Buscar ou criar treinos
  let treinoA = await prisma.treino.findFirst({ where: { nome: 'Treino A' } });
  let treinoB = await prisma.treino.findFirst({ where: { nome: 'Treino B' } });
  let treinoC = await prisma.treino.findFirst({ where: { nome: 'Treino C' } });

  if (!treinoA) {
    treinoA = await prisma.treino.create({
      data: { nome: 'Treino A', prazoVencimentoDias: 7 }
    });
    console.log('✅ Treino A criado');
  }

  if (!treinoB) {
    treinoB = await prisma.treino.create({
      data: { nome: 'Treino B', prazoVencimentoDias: 14 }
    });
    console.log('✅ Treino B criado');
  }

  if (!treinoC) {
    treinoC = await prisma.treino.create({
      data: { nome: 'Treino C', prazoVencimentoDias: 10 }
    });
    console.log('✅ Treino C criado');
  }

  // Verificar se já existem notificações de teste
  let notificacoesExistentes = 0;
  try {
    notificacoesExistentes = await prisma.notificacao.count();
  } catch (e: any) {
    if (e.message?.includes('notificacao') || e.message?.includes('does not exist')) {
      console.log('⚠️ Model Notificacao ainda não está disponível. Execute: npm run prisma:generate');
      console.log('⚠️ Certifique-se de que o servidor backend está parado antes de gerar o Prisma Client.');
      return;
    }
    throw e;
  }
  
  if (notificacoesExistentes === 0) {
    const agora = new Date();
    const semanaPassada = new Date(agora);
    semanaPassada.setDate(semanaPassada.getDate() - 8);

    // Criar notificações de teste
    await prisma.notificacao.createMany({
      data: [
        {
          treinoId: treinoA.id,
          tipo: 'vencido',
          mensagem: `O treino "${treinoA.nome}" venceu há 3 dia(s). Último treino: ${semanaPassada.toLocaleDateString()}`,
          visualizada: false
        },
        {
          treinoId: treinoB.id,
          tipo: 'vencido',
          mensagem: `O treino "${treinoB.nome}" nunca foi realizado.`,
          visualizada: false
        },
        {
          treinoId: treinoC.id,
          tipo: 'vencido',
          mensagem: `O treino "${treinoC.nome}" venceu há 5 dia(s). Último treino: ${semanaPassada.toLocaleDateString()}`,
          visualizada: false
        }
      ]
    });

    console.log('✅ 3 notificações de teste criadas');
  } else {
    console.log(`ℹ️ Já existem ${notificacoesExistentes} notificação(ões) no banco`);
  }

  // Adicionar alguns exercícios de exemplo
  const exerciciosExistentes = await prisma.exercicio.count();
  if (exerciciosExistentes === 0 && treinoA) {
    await prisma.exercicio.createMany({
      data: [
        {
          treinoId: treinoA.id,
          nome: 'Supino Reto',
          series: 4,
          repeticoes: 10,
          peso: 80
        },
        {
          treinoId: treinoA.id,
          nome: 'Agachamento',
          series: 4,
          repeticoes: 12,
          peso: 100
        },
        {
          treinoId: treinoB.id,
          nome: 'Rosca Direta',
          series: 3,
          repeticoes: 12,
          peso: 15
        }
      ]
    });
    console.log('✅ Exercícios de exemplo criados');
  }

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

