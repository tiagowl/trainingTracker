-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "treinoId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'vencido',
    "mensagem" TEXT NOT NULL,
    "visualizada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notificacao_visualizada_createdAt_idx" ON "Notificacao"("visualizada", "createdAt");

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE CASCADE ON UPDATE CASCADE;
