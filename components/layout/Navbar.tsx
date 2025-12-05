import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../Icons';
import { useUI } from '../../contexts/UIContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useUI();

  const isActive = (path: string) => location.pathname === path;

  const NavLink: React.FC<{ to: string; label: string; mobile?: boolean }> = ({ to, label, mobile }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`
        uppercase tracking-wider font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm
        ${mobile ? 'block w-full text-left py-3 px-4 hover:bg-gray-100 border-b border-gray-100 text-gray-700' : ''}
        ${!mobile && isActive(to) ? 'text-legal-gold' : !mobile ? 'text-white hover:text-legal-gold' : ''}
      `}
      aria-current={isActive(to) ? 'page' : undefined}
    >
      {label}
    </Link>
  );

  return (
    <header id="menu" className="sticky w-full top-0 z-40 bg-legal-blue shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm p-1"
            aria-label="Ir para o início"
          >
            <div className="bg-legal-gold p-2 rounded-sm">
              <Icons.Scale className="text-white" size={24} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-legal-gold text-xs font-bold tracking-widest uppercase">Poder Judiciário</span>
              <span className="text-white font-serif font-bold text-lg leading-tight">2ª Vara Cível</span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8" aria-label="Navegação Principal">
            <NavLink to="/" label="Início" />
            <NavLink to="/servicos" label="Serviços" />
            <NavLink to="/noticias" label="Notícias" />
            <NavLink to="/contato" label="Contato" />
          </nav>

          <button 
            className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <Icons.X size={28} aria-hidden="true" /> : <Icons.Menu size={28} aria-hidden="true" /> }
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-xl">
          <NavLink mobile to="/" label="Início" />
          <NavLink mobile to="/servicos" label="Serviços" />
          <NavLink mobile to="/noticias" label="Notícias" />
          <NavLink mobile to="/contato" label="Contato" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
