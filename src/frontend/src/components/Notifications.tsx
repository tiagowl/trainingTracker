import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

type Notificacao = {
  id: string;
  treinoId: string;
  mensagem: string;
  createdAt: string;
  treino: { id: string; nome: string };
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function loadNotifications() {
    try {
      const [list, countRes] = await Promise.all([
        api.get('/notificacoes'),
        api.get('/notificacoes/count')
      ]);
      setNotificacoes(list);
      setCount(countRes.count);
    } catch (e) {
      console.error('Erro ao carregar notificações', e);
    }
  }

  useEffect(() => {
    loadNotifications();
    // Gerar notificações ao carregar
    api.post('/notificacoes/gerar', {}).catch(() => {});
    
    // Polling a cada 30 segundos
    const interval = setInterval(() => {
      api.post('/notificacoes/gerar', {}).then(() => loadNotifications()).catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  async function marcarVisualizada(id: string) {
    try {
      await api.patch(`/notificacoes/${id}/visualizar`, {});
      await loadNotifications();
    } catch (e) {
      console.error('Erro ao marcar como visualizada', e);
    }
  }

  async function marcarTodasVisualizadas() {
    try {
      await api.patch('/notificacoes/visualizar-todas', {});
      await loadNotifications();
    } catch (e) {
      console.error('Erro ao marcar todas como visualizadas', e);
    }
  }

  return (
    <div className="notifications-container" ref={dropdownRef}>
      <button
        className="notifications-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificações"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {count > 0 && <span className="notifications-badge">{count > 99 ? '99+' : count}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notificações {count > 0 && <span>({count})</span>}</h3>
            {count > 0 && (
              <button className="notifications-mark-all" onClick={marcarTodasVisualizadas}>
                Marcar todas como lidas
              </button>
            )}
          </div>
          <div className="notifications-list">
            {notificacoes.length === 0 ? (
              <div className="notifications-empty">Nenhuma notificação</div>
            ) : (
              notificacoes.map(notif => (
                <div
                  key={notif.id}
                  className="notification-item"
                  onClick={async () => {
                    await marcarVisualizada(notif.id);
                    setIsOpen(false);
                    navigate(`/treinos/${notif.treinoId}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="notification-content">
                    <div className="notification-message">{notif.mensagem}</div>
                    <div className="notification-time">
                      {new Date(notif.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

