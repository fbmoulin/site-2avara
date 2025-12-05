import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../Icons';
import { useUI } from '../../contexts/UIContext';

const AccessibilityBar: React.FC = () => {
  const { fontSize, setFontSize, highContrast, setHighContrast, isDarkMode, setIsDarkMode } = useUI();

  return (
    <div id="accessibility-bar" className="bg-[#0a101e] text-gray-300 text-xs py-2 border-b border-gray-800 relative z-50" role="toolbar" aria-label="Ferramentas de Acessibilidade">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex gap-4">
          <a href="#main-content" className="hover:text-legal-gold transition-colors" accessKey="1">Ir para o conteúdo [1]</a>
          <a href="#menu" className="hover:text-legal-gold transition-colors" accessKey="2">Ir para o menu [2]</a>
          <a href="#footer" className="hover:text-legal-gold transition-colors" accessKey="3">Ir para o rodapé [3]</a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/acessibilidade"
            className="flex items-center gap-2 bg-gray-800/50 px-2 py-1 rounded high-contrast-ignore hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
            title="Ver recursos e tutorial de acessibilidade"
            aria-label="Ir para página de recursos de acessibilidade"
          >
            <Icons.Accessibility size={14} className="text-legal-gold" aria-hidden="true" />
            <span className="font-bold uppercase tracking-wider text-[10px]">Acessibilidade</span>
          </Link>
          <div className="flex gap-1 items-center border-l border-gray-700 pl-4">
            <button 
              onClick={() => setFontSize(0)} 
              className={`p-1 hover:text-white ${fontSize === 0 ? 'text-legal-gold' : ''}`}
              title="Tamanho da fonte padrão"
              aria-label="Tamanho da fonte padrão"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize(prev => prev < 2 ? prev + 1 : 2)} 
              className={`p-1 hover:text-white ${fontSize > 0 ? 'text-legal-gold' : ''}`}
              title="Aumentar tamanho da fonte"
              aria-label="Aumentar fonte"
            >
              <span className="text-sm font-bold">A+</span>
            </button>
            <button 
              onClick={() => setFontSize(prev => prev > 0 ? prev - 1 : 0)} 
              className={`p-1 hover:text-white ${fontSize > 0 ? 'text-legal-gold' : ''}`}
              title="Diminuir tamanho da fonte"
              aria-label="Diminuir fonte"
            >
              <span className="text-xs">A-</span>
            </button>
          </div>
          
          <div className="flex gap-4 border-l border-gray-700 pl-4">
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1 hover:text-white ${highContrast ? 'text-yellow-400 font-bold' : ''}`}
              title={highContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
            >
              <Icons.Eye size={14} aria-hidden="true" />
              <span className="hidden sm:inline">Alto Contraste</span>
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-1 hover:text-white ${isDarkMode ? 'text-legal-gold' : ''}`}
              title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Noturno"}
            >
              {isDarkMode ? <Icons.Sun size={14} aria-hidden="true" /> : <Icons.Moon size={14} aria-hidden="true" />}
              <span className="hidden sm:inline">Modo Noturno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;
