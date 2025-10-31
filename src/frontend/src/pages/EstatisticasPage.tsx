import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Treino = { id: string; nome: string };
interface Serie { data: string; peso: number }

export default function EstatisticasPage() {
  const [stats, setStats] = useState<{ totalMes: number; totalGeral: number } | null>(null);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [treinoId, setTreinoId] = useState('');
  const [exercicios, setExercicios] = useState<{ id: string; nome: string }[]>([]);
  const [exercicioId, setExercicioId] = useState('');
  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    api.get('/estatisticas?periodo=mes').then(setStats).catch(() => setStats(null));
    api.get('/treinos').then(setTreinos).catch(() => setTreinos([]));
  }, []);

  useEffect(() => {
    if (!treinoId) { setExercicios([]); setExercicioId(''); return; }
    api.get(`/treinos/${treinoId}/exercicios`).then(setExercicios).catch(() => { setExercicios([]); setExercicioId(''); });
  }, [treinoId]);

  async function loadSerie() {
    if (!exercicioId) return;
    const s = await api.get(`/estatisticas/exercicio/${exercicioId}`);
    setSeries(s);
  }

  return (
    <>
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalMes}</div>
            <div className="stat-label">Este Mês</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalGeral}</div>
            <div className="stat-label">Total Geral</div>
          </div>
        </div>
      )}

      <div className="card">
        <h2>Evolução por Exercício</h2>
        <div className="stack-sm" style={{ marginBottom: 'var(--space-5)' }}>
          <select className="input" value={treinoId} onChange={e => setTreinoId(e.target.value)}>
            <option value="">Selecione um treino</option>
            {treinos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <select className="input" value={exercicioId} onChange={e => setExercicioId(e.target.value)} disabled={!treinoId}>
            <option value="">Selecione um exercício</option>
            {exercicios.map(ex => <option key={ex.id} value={ex.id}>{ex.nome}</option>)}
          </select>
          <button className="button" onClick={loadSerie} disabled={!exercicioId}>Ver Evolução</button>
        </div>

        {series.length > 0 && (
          <div>
            <h3>Histórico de Peso</h3>
            <div className="list">
              {series.map((p, idx) => (
                <div key={idx} className="card" style={{ padding: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {new Date(p.data).toLocaleDateString()}
                    </span>
                    <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{p.peso} kg</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
