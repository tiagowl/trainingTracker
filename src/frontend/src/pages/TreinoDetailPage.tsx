import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

type Exercicio = { id: string; nome: string; series: number; repeticoes: number; peso: number };

type Treino = { id: string; nome: string };

export default function TreinoDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [form, setForm] = useState({ nome: '', series: 3, repeticoes: 10, peso: 0 });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    const treinos = await api.get('/treinos');
    const t = (treinos as Treino[]).find(x => x.id === id) || null;
    setTreino(t);
    if (id) {
      const list = await api.get(`/treinos/${id}/exercicios`);
      setExercicios(list);
    }
  }

  useEffect(() => { load(); }, [id, location.key]);

  async function addExercicio() {
    if (!id) return;
    const created = await api.post(`/exercicios/treino/${id}`, form);
    setExercicios(prev => [...prev, created]);
    setForm({ nome: '', series: 3, repeticoes: 10, peso: 0 });
  }

  async function removeExercicio() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/exercicios/${deleteId}`);
      setExercicios(prev => prev.filter(e => e.id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      console.error('Erro ao remover exercício:', e);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="card">
        <h2>{treino?.nome || 'Treino'}</h2>
        <h3>Adicionar Exercício</h3>
        <div className="grid-2" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <label htmlFor="add-nome-exercicio" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Nome do Exercício *
            </label>
            <input 
              id="add-nome-exercicio"
              className="input" 
              placeholder="Ex: Supino reto" 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
            />
          </div>
          <div>
            <label htmlFor="add-series" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Séries *
            </label>
            <input 
              id="add-series"
              className="input" 
              type="number" 
              min={1} 
              max={20} 
              placeholder="3" 
              value={form.series || ''} 
              onChange={e => setForm({ ...form, series: Number(e.target.value) || 0 })} 
            />
          </div>
          <div>
            <label htmlFor="add-repeticoes" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Repetições *
            </label>
            <input 
              id="add-repeticoes"
              className="input" 
              type="number" 
              min={1} 
              max={100} 
              placeholder="10" 
              value={form.repeticoes || ''} 
              onChange={e => setForm({ ...form, repeticoes: Number(e.target.value) || 0 })} 
            />
          </div>
          <div>
            <label htmlFor="add-peso" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Peso (kg) *
            </label>
            <input 
              id="add-peso"
              className="input" 
              type="number" 
              min={0} 
              step="0.5"
              placeholder="0" 
              value={form.peso || ''} 
              onChange={e => setForm({ ...form, peso: Number(e.target.value) || 0 })} 
            />
          </div>
        </div>
        <button className="button" onClick={addExercicio} disabled={!form.nome.trim()}>
          Adicionar Exercício
        </button>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-5)' }}>
        <h3>Exercícios ({exercicios.length})</h3>
        {exercicios.length === 0 ? (
          <div className="empty-state">Nenhum exercício cadastrado ainda.</div>
        ) : (
          <div className="list">
            {exercicios.map(ex => (
              <div key={ex.id} className="card" style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ fontSize: '1rem' }}>{ex.nome}</strong>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                      {ex.series}x{ex.repeticoes} @ {ex.peso}kg
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Link 
                      to={`/treinos/${id}/exercicios/${ex.id}/edit`} 
                      className="button secondary small"
                      style={{ textDecoration: 'none' }}
                    >
                      Editar
                    </Link>
                    <button className="button danger small" onClick={() => setDeleteId(ex.id)}>Remover</button>
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
            <p>Remover este exercício? Esta ação não pode ser desfeita.</p>
            <div className="stack-sm">
              <button className="button danger" onClick={removeExercicio} disabled={deleting}>
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
