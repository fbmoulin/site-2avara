import React from 'react';
import { Icons } from '../Icons';
import { useUI } from '../../contexts/UIContext';

const Footer: React.FC = () => {
  const { setIsPrivacyOpen, setIsTermsOpen } = useUI();

  return (
    <footer id="footer" className="bg-slate-950 text-gray-400 py-8 border-t border-gray-800" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Icons.Scale size={20} className="text-gray-600" aria-hidden="true" />
            <span className="font-serif text-sm">© 2025 - 2ª Vara Cível de Cariacica. Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-6 text-sm">
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline"
            >
              Política de Privacidade
            </button>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
