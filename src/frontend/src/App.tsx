import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TreinosPage from './pages/TreinosPage';
import HistoricoPage from './pages/HistoricoPage';
import EstatisticasPage from './pages/EstatisticasPage';
import TreinoDetailPage from './pages/TreinoDetailPage';
import EditExercicioPage from './pages/EditExercicioPage';
import EditTreinoPage from './pages/EditTreinoPage';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/treinos" element={<TreinosPage />} />
          <Route path="/treinos/:id/edit" element={<EditTreinoPage />} />
          <Route path="/treinos/:id" element={<TreinoDetailPage />} />
          <Route path="/treinos/:treinoId/exercicios/:exercicioId/edit" element={<EditExercicioPage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/estatisticas" element={<EstatisticasPage />} />
        </Routes>
      </div>
    </>
  );
}

