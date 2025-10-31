import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Notifications from './Notifications';

function NavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  return (
    <Link 
      to={to} 
      className={isActive ? 'active' : ''}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Training Tracker</h1>
          <div className="navbar-right">
            <nav className="navbar-nav-desktop">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/treinos">Treinos</NavLink>
              <NavLink to="/historico">Histórico</NavLink>
              <NavLink to="/estatisticas">Estatísticas</NavLink>
            </nav>
            <Notifications />
            <button className="navbar-toggle" onClick={toggleDrawer} aria-label="Menu">
              <span className={`hamburger ${isDrawerOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay */}
      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={closeDrawer}></div>

      {/* Drawer */}
      <aside className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Menu</h2>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Fechar">
            ✕
          </button>
        </div>
        <nav className="drawer-nav">
          <NavLink to="/" onClick={closeDrawer}>Home</NavLink>
          <NavLink to="/treinos" onClick={closeDrawer}>Treinos</NavLink>
          <NavLink to="/historico" onClick={closeDrawer}>Histórico</NavLink>
          <NavLink to="/estatisticas" onClick={closeDrawer}>Estatísticas</NavLink>
        </nav>
      </aside>
    </>
  );
}

