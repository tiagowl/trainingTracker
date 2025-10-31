import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Sessao = { id: string; dataHora: string; treino: { id: string; nome: string } };

export default function HistoricoPage() {
  const [items, setItems] = useState<Sessao[]>([]);

  useEffect(() => {
    api.get('/sessoes?periodo=mes').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div className="card">
      <h2>Histórico de Treinos</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)', fontSize: '0.875rem' }}>Últimos 30 dias</p>
      {items.length === 0 ? (
        <div className="empty-state">Nenhum treino registrado ainda.</div>
      ) : (
        <div className="list">
          {items.map(s => (
            <div key={s.id} className="card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '1rem' }}>{s.treino?.nome ?? 'Treino'}</strong>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                    {new Date(s.dataHora).toLocaleString()}
                  </div>
                </div>
                <span className="badge success">Concluído</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
