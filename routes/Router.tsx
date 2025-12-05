import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ServicosPage from '../pages/ServicosPage';
import NoticiasPage from '../pages/NoticiasPage';
import AcessibilidadePage from '../pages/AcessibilidadePage';
import ContatoPage from '../pages/ContatoPage';
import AdminPage from '../pages/AdminPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicos" element={<ServicosPage />} />
      <Route path="/noticias" element={<NoticiasPage />} />
      <Route path="/acessibilidade" element={<AcessibilidadePage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRouter;
