import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

type Treino = { id: string; nome: string; prazoVencimentoDias: number };

type TreinoStatus = { treinoId: string; nome: string; prazoVencimentoDias: number; lastSessao: string | null; daysSince: number | null; status: 'ok' | 'vencendo' | 'vencido' };

export default function HomePage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [treinoId, setTreinoId] = useState<string>('');
  const [stats, setStats] = useState<{ totalMes: number; totalGeral: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<TreinoStatus[]>([]);

  useEffect(() => {
    api.get('/treinos').then(setTreinos).catch(() => setTreinos([]));
    api.get('/estatisticas?periodo=mes').then(setStats).catch(() => setStats(null));
    api.get('/treinos/status').then(setStatuses).catch(() => setStatuses([]));
  }, []);

  async function checkin() {
    if (!treinoId) return;
    setLoading(true);
    try {
      await api.post('/sessoes', { treinoId });
      const s = await api.get('/estatisticas?periodo=mes');
      setStats(s);
      const st = await api.get('/treinos/status');
      setStatuses(st);
      alert('Check-in realizado!');
    } catch (e) {
      alert('Falha no check-in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card">
        <h2>Treino do Dia</h2>
        <div className="stack-sm">
          <select className="input" value={treinoId} onChange={e => setTreinoId(e.target.value)}>
            <option value="">Selecione um treino</option>
            {treinos.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
          <button className="button" onClick={checkin} disabled={!treinoId || loading}>
            {loading ? 'Enviando...' : 'Fazer Check-in'}
          </button>
          <Link to="/treinos" className="button secondary">Gerenciar Treinos</Link>
        </div>
      </div>

      {stats && (
        <div className="stats-grid" style={{ marginTop: 'var(--space-5)' }}>
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

      {statuses.filter(s => s.status !== 'ok').length > 0 && (
        <div className="card" style={{ marginTop: 'var(--space-5)' }}>
          <h3>Notificações</h3>
          <div className="list">
            {statuses.filter(s => s.status !== 'ok').map(s => (
              <div key={s.treinoId} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', alignItems: 'center', padding: 'var(--space-3)', background: s.status === 'vencido' ? 'var(--color-alert-light)' : 'var(--color-attention-light)', borderRadius: 'var(--radius)', flexWrap: 'wrap' }}>
                <div>
                  <strong>{s.nome}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                    Último treino: {s.lastSessao ? new Date(s.lastSessao).toLocaleDateString() : 'nunca'}
                  </div>
                </div>
                <span className={`badge ${s.status === 'vencido' ? 'alert' : 'warn'}`}>
                  {s.status === 'vencido' ? 'Vencido' : 'Vencendo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
