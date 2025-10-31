import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

type Treino = { id: string; nome: string; prazoVencimentoDias: number };

type TreinoStatus = { treinoId: string; status: 'ok' | 'vencendo' | 'vencido' };

export default function TreinosPage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [statuses, setStatuses] = useState<TreinoStatus[]>([]);
  const [nome, setNome] = useState('');
  const [prazo, setPrazo] = useState(14);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    const [list, st] = await Promise.all([
      api.get('/treinos'),
      api.get('/treinos/status')
    ]);
    setTreinos(list);
    setStatuses(st);
  }

  useEffect(() => { load(); }, []);

  const statusMap = useMemo(() => Object.fromEntries(statuses.map(s => [s.treinoId, s.status])), [statuses]);

  async function create() {
    if (!nome) return;
    await api.post('/treinos', { nome, prazoVencimentoDias: prazo });
    setNome('');
    setPrazo(14);
    await load();
  }

  async function remove() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/treinos/${deleteId}`);
      await load();
      setDeleteId(null);
    } catch (e) {
      console.error('Erro ao remover treino:', e);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="card">
        <h2>Novo Treino</h2>
        <div className="grid-2" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <label htmlFor="nome-treino" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Nome do Treino *
            </label>
            <input 
              id="nome-treino"
              className="input" 
              placeholder="Ex: Treino A, Treino B..." 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
            />
          </div>
          <div>
            <label htmlFor="prazo-vencimento" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Prazo de Vencimento (dias) *
            </label>
            <input 
              id="prazo-vencimento"
              className="input" 
              type="number" 
              min={1} 
              max={365} 
              placeholder="14" 
              value={prazo || ''} 
              onChange={e => setPrazo(parseInt(e.target.value || '1'))} 
            />
          </div>
        </div>
        <button className="button" onClick={create} disabled={!nome.trim()}>
          Criar Treino
        </button>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-5)' }}>
        <h2>Meus Treinos</h2>
        {treinos.length === 0 ? (
          <div className="empty-state">Nenhum treino cadastrado ainda.</div>
        ) : (
          <div className="list">
            {treinos.map(t => (
              <div key={t.id} className="card" style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1.125rem' }}>{t.nome}</strong>
                    <span className="badge info">Prazo: {t.prazoVencimentoDias}d</span>
                    {statusMap[t.id] === 'vencendo' && <span className="badge warn">Vencendo</span>}
                    {statusMap[t.id] === 'vencido' && <span className="badge alert">Vencido</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <Link to={`/treinos/${t.id}`} className="button small">Abrir</Link>
                    <Link to={`/treinos/${t.id}/edit`} className="button secondary small">Editar</Link>
                    <button className="button danger small" onClick={() => setDeleteId(t.id)}>Remover</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Remoção</h3>
            <p>Remover este treino? Todos os dados associados (exercícios, sessões, notificações) serão excluídos permanentemente.</p>
            <div className="stack-sm">
              <button className="button danger" onClick={remove} disabled={deleting}>
                {deleting ? 'Removendo...' : 'Sim, Remover'}
              </button>
              <button className="button secondary" onClick={() => setDeleteId(null)} disabled={deleting}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
