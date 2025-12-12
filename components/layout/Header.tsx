import React, { useState } from 'react';
import { Icons } from '../Icons';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  mapsUrl?: string;
}

const MAPS_URL_DEFAULT = 'https://maps.google.com/maps?q=F%C3%B3rum+Desembargador+Am%C3%A9rico+Ribeiro+Coelho,+R.+Meridional,+1000+-+Alto+Lage,+Cariacica+-+ES';

export const Header: React.FC<HeaderProps> = ({
  navItems,
  activeSection,
  onNavigate,
  mapsUrl = MAPS_URL_DEFAULT,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      id="menu"
      className="bg-legal-blue text-white sticky top-0 z-40 shadow-lg"
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
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
        </a>

        <nav
          className="hidden md:flex gap-6 items-center"
          role="navigation"
          aria-label="Menu principal"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`uppercase tracking-wider font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm ${
                activeSection === item.id
                  ? 'text-legal-gold'
                  : 'text-white hover:text-legal-gold'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-200 hover:text-legal-gold font-medium transition-colors text-sm"
            title="Ver localização no Google Maps"
          >
            <Icons.MapPin size={16} />
            Localização
          </a>
        </nav>

        <button
          className="md:hidden p-2 rounded-md hover:bg-legal-blue-hover transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? (
            <Icons.X size={24} aria-hidden="true" />
          ) : (
            <Icons.Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-200 py-4 shadow-inner"
          role="navigation"
          aria-label="Menu mobile"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="block w-full text-left py-3 px-4 hover:bg-gray-100 border-b border-gray-100 text-gray-700 uppercase tracking-wider font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm"
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 text-legal-blue hover:bg-legal-gold hover:text-white transition-colors border-b border-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icons.MapPin size={18} />
            Localização
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
