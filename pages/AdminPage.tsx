import React from 'react';
import { Icons } from '../components/Icons';

const AdminPage: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 min-h-screen" aria-label="Painel Administrativo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icons.Settings className="text-legal-gold" size={32} />
            <h1 className="text-3xl font-serif font-bold text-legal-blue">Painel Administrativo</h1>
          </div>
          <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Área reservada à equipe da Vara para gestão de conteúdos do site.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Icons.Lock className="text-gray-400" size={40} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-700 mb-3">
            Em Desenvolvimento
          </h3>
          <p className="text-gray-500 mb-6 px-6">
            O painel administrativo para gerenciamento de artigos, notícias e conteúdos 
            está em fase de desenvolvimento.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Icons.Clock size={16} />
            <span>Previsão: Em breve</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
