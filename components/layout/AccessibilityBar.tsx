import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Icons } from '../Icons';

interface AccessibilityBarProps {
  onSkipToContent?: () => void;
  onSkipToMenu?: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  onSkipToContent,
  onSkipToMenu,
}) => {
  const {
    fontSize,
    highContrast,
    isDarkMode,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleDarkMode,
  } = useAccessibility();

  return (
    <div
      id="accessibility-bar"
      className="bg-[#0a101e] text-gray-300 text-xs py-2 border-b border-gray-800 relative z-50"
      role="toolbar"
      aria-label="Ferramentas de Acessibilidade"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex gap-4">
          <a
            href="#main-content"
            className="hover:text-legal-gold transition-colors"
            accessKey="1"
            onClick={onSkipToContent}
          >
            Ir para o conteúdo [1]
          </a>
          <a
            href="#menu"
            className="hover:text-legal-gold transition-colors"
            accessKey="2"
            onClick={onSkipToMenu}
          >
            Ir para o menu [2]
          </a>
        </div>

        <div className="flex items-center gap-3" role="group" aria-label="Controles de acessibilidade">
          <div className="flex items-center gap-1">
            <span className="mr-1">Fonte:</span>
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 0}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Diminuir tamanho da fonte"
              title="Diminuir fonte"
            >
              A-
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 2}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Aumentar tamanho da fonte"
              title="Aumentar fonte"
            >
              A+
            </button>
          </div>

          <div className="w-px h-4 bg-gray-600" aria-hidden="true" />

          <button
            onClick={toggleHighContrast}
            className={`px-2 py-1 rounded border transition-colors ${
              highContrast
                ? 'bg-yellow-500 text-black border-yellow-500'
                : 'border-gray-600 hover:bg-gray-700'
            }`}
            aria-pressed={highContrast}
            title="Alto contraste"
          >
            <Icons.Eye size={14} className="inline mr-1" aria-hidden="true" />
            Contraste
          </button>

          <button
            onClick={toggleDarkMode}
            className={`px-2 py-1 rounded border transition-colors ${
              isDarkMode
                ? 'bg-gray-600 border-gray-500'
                : 'border-gray-600 hover:bg-gray-700'
            }`}
            aria-pressed={isDarkMode}
            title="Modo escuro"
          >
            {isDarkMode ? (
              <Icons.Sun size={14} className="inline" aria-hidden="true" />
            ) : (
              <Icons.Moon size={14} className="inline" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;
