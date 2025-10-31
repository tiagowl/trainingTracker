import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

type Treino = { id: string; nome: string; prazoVencimentoDias: number };

export default function EditTreinoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [form, setForm] = useState({ nome: '', prazoVencimentoDias: 14 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (!id) {
          setError('ID inválido');
          return;
        }

        const treinos = await api.get('/treinos');
        const t = (treinos as Treino[]).find(x => x.id === id) || null;
        if (!t) {
          setError('Treino não encontrado');
          return;
        }
        setTreino(t);
        setForm({
          nome: t.nome,
          prazoVencimentoDias: t.prazoVencimentoDias
        });
      } catch (e) {
        setError('Erro ao carregar treino');
      }
    }
    load();
  }, [id]);

  async function save() {
    if (!id || !form.nome.trim()) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.patch(`/treinos/${id}`, form);
      navigate('/treinos');
    } catch (e) {
      setError('Erro ao salvar treino');
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!id) return;

    setLoading(true);
    try {
      await api.delete(`/treinos/${id}`);
      navigate('/treinos');
    } catch (e) {
      setError('Erro ao remover treino');
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  if (error && !treino) {
    return (
      <div className="card">
        <h2>Erro</h2>
        <p style={{ color: 'var(--color-alert)' }}>{error}</p>
        <button className="button" onClick={() => navigate('/treinos')}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <h2>Editar Treino</h2>
          <button className="button secondary" onClick={() => navigate('/treinos')}>
            Cancelar
          </button>
        </div>

        {error && (
          <div style={{ 
            padding: 'var(--space-3)', 
            background: 'var(--color-alert-light)', 
            color: 'var(--color-alert)', 
            borderRadius: 'var(--radius)', 
            marginBottom: 'var(--space-4)',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
          <div>
            <label htmlFor="edit-nome-treino" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Nome do Treino *
            </label>
            <input 
              id="edit-nome-treino"
              className="input" 
              placeholder="Ex: Treino A, Treino B..." 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
            />
          </div>
          <div>
            <label htmlFor="edit-prazo-vencimento" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Prazo de Vencimento (dias) *
            </label>
            <input 
              id="edit-prazo-vencimento"
              className="input" 
              type="number" 
              min={1} 
              max={365} 
              placeholder="14" 
              value={form.prazoVencimentoDias || ''} 
              onChange={e => setForm({ ...form, prazoVencimentoDias: parseInt(e.target.value || '1') })} 
            />
          </div>
        </div>

        <div className="stack-sm">
          <button className="button" onClick={save} disabled={loading || !form.nome.trim()}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button className="button danger" onClick={() => setShowDeleteConfirm(true)} disabled={loading}>
            Remover Treino
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Remoção</h3>
            <p>Remover este treino? Todos os dados associados (exercícios, sessões, notificações) serão excluídos permanentemente.</p>
            <div className="stack-sm">
              <button className="button danger" onClick={remove} disabled={loading}>
                {loading ? 'Removendo...' : 'Sim, Remover'}
              </button>
              <button className="button secondary" onClick={() => setShowDeleteConfirm(false)} disabled={loading}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


