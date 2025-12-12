import React from 'react';
import { Icons } from '../Icons';
import { CONTACT_INFO } from '../../constants';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a101e] text-gray-400 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-serif text-lg mb-4">2ª Vara Cível</h3>
            <p className="text-sm">Comarca de Cariacica - ES</p>
            <p className="text-sm mt-2">Tribunal de Justiça do Estado do Espírito Santo</p>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-4">Contato</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Icons.MapPin size={14} aria-hidden="true" />
                {CONTACT_INFO.address}
              </p>
              <p className="flex items-center gap-2">
                <Icons.Phone size={14} aria-hidden="true" />
                {CONTACT_INFO.phone}
              </p>
              <p className="flex items-center gap-2">
                <Icons.Mail size={14} aria-hidden="true" />
                {CONTACT_INFO.email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-4">Horário</h3>
            <div className="space-y-2 text-sm">
              <p>Segunda a Sexta: 12h às 18h</p>
              <p className="text-xs text-gray-500 mt-2">
                Expediente forense conforme Resolução TJES
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-4">Links Úteis</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://www.tjes.jus.br"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-legal-gold transition-colors"
              >
                TJES - Site Oficial
              </a>
              <a
                href="https://sistemas.tjes.jus.br/consultaunificada"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-legal-gold transition-colors"
              >
                Consulta Processual
              </a>
              <button
                onClick={onOpenPrivacy}
                className="block hover:text-legal-gold transition-colors text-left"
              >
                Política de Privacidade
              </button>
              <button
                onClick={onOpenTerms}
                className="block hover:text-legal-gold transition-colors text-left"
              >
                Termos de Uso
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            © {currentYear} 2ª Vara Cível de Cariacica. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Desenvolvido em conformidade com as diretrizes de acessibilidade do WCAG 2.1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
