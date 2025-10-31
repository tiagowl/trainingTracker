import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

type Exercicio = { id: string; nome: string; series: number; repeticoes: number; peso: number };
type Treino = { id: string; nome: string };

export default function EditExercicioPage() {
  const { treinoId, exercicioId } = useParams();
  const navigate = useNavigate();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [exercicio, setExercicio] = useState<Exercicio | null>(null);
  const [form, setForm] = useState({ nome: '', series: 3, repeticoes: 10, peso: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (!treinoId || !exercicioId) {
          setError('IDs inválidos');
          return;
        }

        // Carregar treino
        const treinos = await api.get('/treinos');
        const t = (treinos as Treino[]).find(x => x.id === treinoId) || null;
        setTreino(t);

        // Carregar exercício
        const exercicios = await api.get(`/treinos/${treinoId}/exercicios`);
        const ex = exercicios.find((e: Exercicio) => e.id === exercicioId) || null;
        if (!ex) {
          setError('Exercício não encontrado');
          return;
        }
        setExercicio(ex);
        setForm({
          nome: ex.nome,
          series: ex.series,
          repeticoes: ex.repeticoes,
          peso: ex.peso
        });
      } catch (e) {
        setError('Erro ao carregar dados');
      }
    }
    load();
  }, [treinoId, exercicioId]);

  async function save() {
    if (!exercicioId || !form.nome.trim()) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.patch(`/exercicios/${exercicioId}`, form);
      navigate(`/treinos/${treinoId}`);
    } catch (e) {
      setError('Erro ao salvar exercício');
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!exercicioId) return;

    setLoading(true);
    try {
      await api.delete(`/exercicios/${exercicioId}`);
      navigate(`/treinos/${treinoId}`);
    } catch (e) {
      setError('Erro ao remover exercício');
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  if (error && !exercicio) {
    return (
      <div className="card">
        <h2>Erro</h2>
        <p style={{ color: 'var(--color-alert)' }}>{error}</p>
        <Link to={treinoId ? `/treinos/${treinoId}` : '/treinos'} className="button">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <div>
            <h2>Editar Exercício</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Treino: {treino?.nome || 'Carregando...'}
            </p>
          </div>
          <Link to={treinoId ? `/treinos/${treinoId}` : '/treinos'} className="button secondary">
            Cancelar
          </Link>
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
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Nome do Exercício *
            </label>
            <input 
              className="input" 
              placeholder="Ex: Supino reto" 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Séries *
            </label>
            <input 
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
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Repetições *
            </label>
            <input 
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
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>
              Peso (kg) *
            </label>
            <input 
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

        <div className="stack-sm">
          <button className="button" onClick={save} disabled={loading || !form.nome.trim()}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button className="button danger" onClick={() => setShowDeleteConfirm(true)} disabled={loading}>
            Remover Exercício
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Remoção</h3>
            <p>Remover este exercício? Esta ação não pode ser desfeita.</p>
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

