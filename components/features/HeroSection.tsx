import React from 'react';
import { Icons } from '../Icons';
import { NavigationSection } from '../../types';
import forumImage from '@assets/forum_1764897995940.jpg';

interface HeroSectionProps {
  onNavigateToServices: () => void;
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToServices,
  onOpenChat,
}) => {
  return (
    <section
      id={NavigationSection.HOME}
      className="relative h-[600px] flex items-center justify-center bg-gray-900"
      aria-label="Introdução"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={forumImage}
          alt="Fórum Des. Américo Ribeiro Coelho - Cariacica"
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-legal-blue/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-6 inline-block px-4 py-3 sm:px-6 sm:py-4 md:px-8 border-2 border-legal-gold text-legal-gold tracking-widest font-bold rounded-lg bg-legal-blue/50 backdrop-blur-sm">
          <div className="text-xl sm:text-3xl md:text-5xl lg:text-6xl uppercase">
            2ª VARA CÍVEL
          </div>
          <div className="text-sm sm:text-lg md:text-2xl lg:text-3xl uppercase mt-1 sm:mt-2">
            COMARCA DE CARIACICA - ES
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          Excelência e Celeridade <br /> na Prestação Jurisdicional
        </h1>
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
          Portal oficial de serviços digitais, consultas processuais e atendimento ao cidadão.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNavigateToServices}
            className="px-8 py-3 bg-legal-gold hover:bg-legal-gold-hover text-white font-bold rounded-sm shadow-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-legal-blue"
          >
            Nossos Serviços
          </button>
          <button
            onClick={onOpenChat}
            className="px-8 py-3 bg-transparent border-2 border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-white font-bold rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legal-gold flex items-center gap-2 mx-auto sm:mx-0"
          >
            <Icons.MessageSquare size={20} />
            Fale Conosco
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
