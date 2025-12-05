import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { JUDGE_INFO } from '../constants';
import { useUI } from '../contexts/UIContext';
import forumImage from '@assets/forum_1764897995940.jpg';

const SectionHeader: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl font-serif font-bold mb-3 ${light ? 'text-white' : 'text-legal-blue'}`}>
      {title}
    </h2>
    <div className={`h-1 w-24 mx-auto mb-4 ${light ? 'bg-legal-gold' : 'bg-legal-gold'}`}></div>
    {subtitle && <p className={`max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const HomePage: React.FC = () => {
  const { setIsChatOpen } = useUI();

  return (
    <>
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900" aria-label="Introdução">
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
          <div className="mb-6 inline-block px-8 py-4 border-2 border-legal-gold text-legal-gold tracking-widest font-bold rounded-lg bg-legal-blue/50 backdrop-blur-sm">
            <div className="text-5xl md:text-6xl uppercase">2ª VARA CÍVEL</div>
            <div className="text-2xl md:text-3xl uppercase mt-2">COMARCA DE CARIACICA - ES</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Excelência e Celeridade <br /> na Prestação Jurisdicional
          </h1>
          <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
            Portal oficial de serviços digitais, consultas processuais e atendimento ao cidadão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/servicos"
              className="px-8 py-3 bg-legal-gold hover:bg-legal-gold-hover text-white font-bold rounded-sm shadow-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-legal-blue"
            >
              Nossos Serviços
            </Link>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-3 bg-transparent border-2 border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-white font-bold rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legal-gold flex items-center gap-2 mx-auto sm:mx-0"
            >
              <Icons.MessageSquare size={20} />
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-label="Informações do Magistrado">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 relative">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-legal-gold rounded-lg -z-0" aria-hidden="true"></div>
              <img 
                src={forumImage} 
                alt="Fórum Des. Américo Ribeiro Coelho - Cariacica"
                className="w-full h-auto rounded-lg shadow-xl relative z-10 bg-gray-200"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-10 bg-legal-gold" aria-hidden="true"></div>
                <span className="text-legal-gold font-bold uppercase tracking-wider text-sm">O Magistrado</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-legal-blue mb-2">{JUDGE_INFO.name}</h2>
              <h3 className="text-xl text-gray-500 mb-6 italic">{JUDGE_INFO.role}</h3>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {JUDGE_INFO.bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-legal-blue">
                  <Icons.Scale className="text-legal-blue mb-3" size={24} aria-hidden="true" />
                  <h4 className="font-bold text-legal-blue mb-2">Missão</h4>
                  <p className="text-sm text-gray-600">Garantir a resolução de conflitos com ética, imparcialidade e agilidade.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-legal-gold">
                  <Icons.Users className="text-legal-gold mb-3" size={24} aria-hidden="true" />
                  <h4 className="font-bold text-legal-blue mb-2">Visão</h4>
                  <p className="text-sm text-gray-600">Ser referência em atendimento humanizado e eficiência processual.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-label="Equipe do Gabinete">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Icons.Users className="text-legal-gold" size={28} />
              <h2 className="text-3xl font-serif font-bold text-legal-blue">Equipe de Gabinete da 2ª Vara Cível</h2>
            </div>
            <div className="h-1 w-24 mx-auto bg-legal-gold"></div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-legal-blue mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-legal-gold rounded-full"></span>
                Assessores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <Icons.User className="text-legal-blue" size={18} />
                  <span>Andreza</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Icons.User className="text-legal-blue" size={18} />
                  <span>Scarllety</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-legal-blue mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-legal-gold rounded-full"></span>
                Estagiárias
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <Icons.User className="text-legal-blue" size={18} />
                  <span>Mariana</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Icons.User className="text-legal-blue" size={18} />
                  <span>Juliana</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
