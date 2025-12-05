import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import { Chatbot } from './components/Chatbot';
import { PrivacyPolicy, TermsOfUse } from './components/LegalDocuments';
import { 
  SERVICES, 
  FAQS, 
  JUDGE_INFO, 
  CONTACT_INFO 
} from './constants';
import { NavigationSection } from './types';
import { fetchNews, NewsItem } from './services/newsService';
import forumImage from '@assets/forum_1764897995940.jpg';
import zoomTutorialImage from '@assets/stock_images/zoom_video_conferenc_61e7f082.jpg';

const SectionHeader: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl font-serif font-bold mb-3 ${light ? 'text-white' : 'text-legal-blue'}`}>
      {title}
    </h2>
    <div className={`h-1 w-24 mx-auto mb-4 ${light ? 'bg-legal-gold' : 'bg-legal-gold'}`}></div>
    {subtitle && <p className={`max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NavigationSection.HOME);
  const [fontSize, setFontSize] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    fetchNews(10).then(setNewsItems);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(NavigationSection);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('font-lg', 'font-xl');
    if (fontSize === 1) html.classList.add('font-lg');
    if (fontSize === 2) html.classList.add('font-xl');

    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [fontSize, highContrast, isDarkMode]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus({ preventScroll: true });
    }
  };

  const NavLink: React.FC<{ section: string; label: string; mobile?: boolean }> = ({ section, label, mobile }) => (
    <button
      onClick={() => scrollToSection(section)}
      className={`
        uppercase tracking-wider font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm
        ${mobile ? 'block w-full text-left py-3 px-4 hover:bg-gray-100 border-b border-gray-100 text-gray-700' : ''}
        ${!mobile && activeSection === section ? 'text-legal-gold' : !mobile ? 'text-white hover:text-legal-gold' : ''}
      `}
      aria-current={activeSection === section ? 'page' : undefined}
    >
      {label}
    </button>
  );

  const getIcon = (name: string, size: number = 32) => {
    switch(name) {
      case 'search': return <Icons.Search size={size} aria-hidden="true" />;
      case 'video': return <Icons.Video size={size} aria-hidden="true" />;
      case 'calendar': return <Icons.Calendar size={size} aria-hidden="true" />;
      case 'download': return <Icons.Download size={size} aria-hidden="true" />;
      case 'file-text': return <Icons.FileText size={16} aria-hidden="true" />;
      case 'mail': return <Icons.Mail size={16} aria-hidden="true" />;
      case 'message-square': return <Icons.MessageSquare size={16} aria-hidden="true" />;
      case 'apple': return <Icons.Apple size={18} aria-hidden="true" />;
      case 'playstore': return <Icons.PlayStore size={18} aria-hidden="true" />;
      default: return <Icons.FileText size={size} aria-hidden="true" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col transition-colors duration-300">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-legal-gold focus:text-white focus:px-4 focus:py-2 focus:rounded shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <div id="accessibility-bar" className="bg-[#0a101e] text-gray-300 text-xs py-2 border-b border-gray-800 relative z-50" role="toolbar" aria-label="Ferramentas de Acessibilidade">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-4">
            <a href="#main-content" className="hover:text-legal-gold transition-colors" accessKey="1">Ir para o conteúdo [1]</a>
            <a href="#menu" className="hover:text-legal-gold transition-colors" accessKey="2">Ir para o menu [2]</a>
            <a href="#footer" className="hover:text-legal-gold transition-colors" accessKey="3">Ir para o rodapé [3]</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const section = document.querySelector('[aria-label="Recursos de Acessibilidade"]');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-gray-800/50 px-2 py-1 rounded high-contrast-ignore hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
              title="Ver recursos e tutorial de acessibilidade"
              aria-label="Ir para seção de recursos de acessibilidade"
            >
              <Icons.Accessibility size={14} className="text-legal-gold" aria-hidden="true" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Acessibilidade</span>
            </button>
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

      <header id="menu" className="sticky w-full top-0 z-40 bg-legal-blue shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            <a 
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
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

            <nav className="hidden md:flex gap-6 items-center" aria-label="Navegação Principal">
              <NavLink section="home" label="Início" />
              <NavLink section="judge" label="Magistrado" />
              <NavLink section="services" label="Serviços" />
              <NavLink section="faq" label="Dúvidas" />
              <NavLink section="contact" label="Contato" />
              <a 
                href="https://maps.google.com/maps?q=F%C3%B3rum+Desembargador+Am%C3%A9rico+Ribeiro+Coelho,+R.+Meridional,+1000+-+Alto+Lage,+Cariacica+-+ES"
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
            <NavLink mobile section="home" label="Início" />
            <NavLink mobile section="judge" label="Magistrado" />
            <NavLink mobile section="services" label="Serviços" />
            <NavLink mobile section="faq" label="Dúvidas" />
            <NavLink mobile section="contact" label="Contato" />
            <a 
              href="https://maps.google.com/maps?q=F%C3%B3rum+Desembargador+Am%C3%A9rico+Ribeiro+Coelho,+R.+Meridional,+1000+-+Alto+Lage,+Cariacica+-+ES"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 text-legal-blue hover:bg-legal-gold hover:text-white transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icons.MapPin size={18} />
              Localização
            </a>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        <section id={NavigationSection.HOME} className="relative h-[600px] flex items-center justify-center bg-gray-900" aria-label="Introdução">
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
              <div className="text-xl sm:text-3xl md:text-5xl lg:text-6xl uppercase">2ª VARA CÍVEL</div>
              <div className="text-sm sm:text-lg md:text-2xl lg:text-3xl uppercase mt-1 sm:mt-2">COMARCA DE CARIACICA - ES</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Excelência e Celeridade <br /> na Prestação Jurisdicional
            </h1>
            <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
              Portal oficial de serviços digitais, consultas processuais e atendimento ao cidadão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection(NavigationSection.SERVICES)}
                className="px-8 py-3 bg-legal-gold hover:bg-legal-gold-hover text-white font-bold rounded-sm shadow-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-legal-blue"
              >
                Nossos Serviços
              </button>
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

        <section id={NavigationSection.JUDGE} className="py-20 bg-white" aria-label="Informações do Magistrado">
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

        <section id={NavigationSection.SERVICES} className="py-20 bg-light-bg" aria-label="Serviços Online">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Serviços Online" 
              subtitle="Acesse os principais serviços da vara sem sair de casa, garantindo agilidade e comodidade." 
            />
            
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              {SERVICES.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col">
                  <div className="w-16 h-16 bg-legal-blue/5 rounded-full flex items-center justify-center mb-6 text-legal-blue group-hover:bg-legal-gold group-hover:text-white transition-colors duration-300">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-legal-blue mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>

                  {/* Links de ação */}
                  {service.links && (
                    <div className="flex flex-col gap-2 w-full">
                      {service.links.map((link, i) => (
                        <a 
                          key={i}
                          href={link.url} 
                          onClick={(e) => {
                            if (link.url === '#chatbot') {
                              e.preventDefault();
                              setIsChatOpen(true);
                            } else if (link.url.startsWith('#')) {
                              e.preventDefault();
                              scrollToSection(link.url.substring(1));
                            }
                          }}
                          target={link.url.startsWith('#') || link.url.startsWith('mailto') ? undefined : "_blank"}
                          rel={link.url.startsWith('#') || link.url.startsWith('mailto') ? undefined : "noopener noreferrer"}
                          className="flex items-center justify-between px-4 py-2 rounded border border-legal-blue/20 text-legal-blue hover:bg-legal-blue hover:text-white transition-colors text-sm font-semibold"
                        >
                          <span className="flex items-center gap-2">
                            {link.icon && getIcon(link.icon)}
                            {link.label}
                          </span>
                          <Icons.ChevronDown className="-rotate-90" size={14} />
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {/* URL simples (quando não há links) */}
                  {!service.links && service.url && (
                    <a 
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-legal-blue text-white font-semibold rounded hover:bg-legal-blue-light transition-colors"
                    >
                      Acessar
                      <Icons.ExternalLink size={16} />
                    </a>
                  )}
                  
                  {/* Tutorial do Zoom (sempre exibe quando existe) */}
                  {service.tutorial && (
                    <div className={service.links ? 'mt-4' : ''}>
                      <button 
                        onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                        className="flex items-center gap-2 text-legal-blue font-semibold hover:text-legal-gold transition-colors"
                      >
                        <Icons.Info size={16} />
                        {expandedService === service.id ? 'Ocultar tutorial' : 'Como participar da audiência?'}
                        <Icons.ChevronDown className={`transform transition-transform ${expandedService === service.id ? 'rotate-180' : ''}`} size={16} />
                      </button>
                      
                      {expandedService === service.id && (
                        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <p className="text-xs font-bold text-legal-blue uppercase mb-3 flex items-center gap-1">
                            <Icons.Video size={14} /> Passo a passo para participar:
                          </p>
                          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2 mb-3">
                            {service.tutorial.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">{step}</li>
                            ))}
                          </ol>
                          {service.tutorialTip && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                              <Icons.AlertCircle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-yellow-800 font-medium">{service.tutorialTip}</p>
                            </div>
                          )}
                          <img 
                            src={zoomTutorialImage} 
                            alt="Exemplo de reunião por videoconferência via Zoom"
                            className="mt-4 w-full h-auto rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white" aria-label="Blog Jurídico">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Blog Jurídico" 
              subtitle="Artigos, orientações e informativos da 2ª Vara Cível de Cariacica" 
            />
            
            <div className="max-w-2xl mx-auto text-center py-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <Icons.Info className="text-amber-600" size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-800 mb-3">
                Em Desenvolvimento
              </h3>
              <p className="text-amber-700 mb-6 px-6">
                Estamos trabalhando para trazer artigos jurídicos, orientações ao cidadão e informativos relevantes. 
                Em breve você terá acesso a conteúdo de qualidade produzido pela nossa equipe.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
                <Icons.Clock size={16} />
                <span>Previsão de lançamento: Em breve</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white" aria-label="Notícias TJES">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Notícias do TJES" 
              subtitle="Últimas notícias do Tribunal de Justiça do Espírito Santo" 
            />
            
            {newsItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando notícias...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.slice(0, 6).map((news) => (
                  <a
                    key={news.id}
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icons.Newspaper className="text-legal-gold" size={16} />
                      <span className="text-xs text-gray-500">
                        {new Date(news.publishedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h4 className="text-gray-800 font-semibold line-clamp-3 hover:text-legal-blue transition-colors">
                      {news.title}
                    </h4>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id={NavigationSection.FAQ} className="py-20 bg-white" aria-label="Perguntas Frequentes">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Perguntas Frequentes" 
              subtitle="Encontre respostas para as dúvidas mais comuns." 
            />
            
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="font-semibold text-legal-blue">{faq.question}</span>
                    <Icons.ChevronDown 
                      className={`text-legal-gold transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
                      size={20}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACCESSIBILITY RESOURCES SECTION */}
        <section className="bg-slate-900 py-16 border-t border-gray-800" aria-label="Recursos de Acessibilidade">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Icons.Accessibility className="text-legal-gold" size={32} />
                <h2 className="text-2xl font-serif font-bold text-white">Recursos de Acessibilidade</h2>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Este portal segue as diretrizes do CNJ (Resolução 401/2021), e-MAG 3.1 e WCAG 2.2 para garantir acesso a todos os cidadãos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {/* Ferramenta 1 - Tamanho de Fonte */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-legal-gold font-bold text-lg">A+</span>
                  </div>
                  <h3 className="text-white font-semibold">Tamanho da Fonte</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Aumente ou diminua o tamanho do texto para melhor leitura.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Clique nos botões A, A+ ou A- na barra superior.
                </div>
              </div>

              {/* Ferramenta 2 - Alto Contraste */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <Icons.Eye className="text-legal-gold" size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Alto Contraste</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Ativa fundo preto com texto claro para pessoas com baixa visão.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Clique em "Alto Contraste" na barra superior.
                </div>
              </div>

              {/* Ferramenta 3 - Modo Noturno */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <Icons.Moon className="text-legal-gold" size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Modo Noturno</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Tema escuro para reduzir fadiga visual em ambientes com pouca luz.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Clique em "Modo Noturno" na barra superior.
                </div>
              </div>

              {/* Ferramenta 4 - Navegação por Teclado */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <Icons.Keyboard className="text-legal-gold" size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Navegação por Teclado</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Navegue pelo site usando apenas o teclado, sem necessidade de mouse.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Use Tab para avançar, Shift+Tab para voltar, Enter para ativar.
                </div>
              </div>

              {/* Ferramenta 5 - Skip Link */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <Icons.SkipForward className="text-legal-gold" size={20} />
                  </div>
                  <h3 className="text-white font-semibold">Pular para Conteúdo</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Pule diretamente para o conteúdo principal, ignorando menus repetitivos.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Pressione Tab ao carregar a página e clique no link que aparecer.
                </div>
              </div>

              {/* Ferramenta 6 - VLibras */}
              <div className="bg-slate-800/50 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-legal-gold/20 rounded-full flex items-center justify-center">
                    <Icons.VLibras className="text-legal-gold" size={20} />
                  </div>
                  <h3 className="text-white font-semibold">VLibras (LIBRAS)</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Tradução automática de textos para Língua Brasileira de Sinais.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-gray-500">
                  <strong className="text-gray-300">Como usar:</strong> Clique no botão azul no canto direito da tela e selecione o texto.
                </div>
              </div>
            </div>

            {/* Tabela de Atalhos */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-semibold text-lg mb-4 text-center flex items-center justify-center gap-2">
                <Icons.Keyboard size={20} className="text-legal-gold" />
                Atalhos de Teclado (Padrão e-MAG)
              </h3>
              <div className="bg-slate-800/50 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 border-b border-gray-700">
                      <th className="text-left text-gray-300 font-semibold py-3 px-4">Atalho</th>
                      <th className="text-left text-gray-300 font-semibold py-3 px-4">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 1</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Ir para o conteúdo principal</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 2</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Ir para o menu de navegação</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Alt + 3</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Ir para o rodapé</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Tab</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Próximo elemento interativo</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Shift + Tab</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Elemento anterior</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Enter</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Ativar elemento focado</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <kbd className="bg-slate-700 text-legal-gold px-2 py-1 rounded text-xs font-mono">Esc</kbd>
                      </td>
                      <td className="py-3 px-4 text-gray-400">Fechar modal ou menu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs text-center mt-3">
                <strong>Nota:</strong> No Firefox, use Alt+Shift+número. No Safari (Mac), use Control+Option+número.
              </p>
            </div>

            {/* Conformidade */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm">
                Este portal está em conformidade com a{' '}
                <span className="text-legal-gold">Resolução CNJ nº 401/2021</span>,{' '}
                <span className="text-legal-gold">e-MAG 3.1</span> e{' '}
                <span className="text-legal-gold">WCAG 2.2 Nível AA</span>.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Problemas de acessibilidade? Entre em contato pelo formulário acima ou ligue para a secretaria da vara.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id={NavigationSection.CONTACT} className="bg-legal-blue text-white py-20" aria-label="Contato">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-white">Canais de Atendimento</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <Icons.MapPin className="text-legal-gold" size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Endereço</h4>
                      <p className="text-gray-300">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <Icons.Phone className="text-legal-gold" size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Telefone</h4>
                      <p className="text-gray-300">{CONTACT_INFO.phone}</p>
                      <p className="text-gray-400 text-sm">Seg-Sex: 12h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <Icons.Mail className="text-legal-gold" size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">E-mail</h4>
                      <p className="text-gray-300">{CONTACT_INFO.email}</p>
                    </div>
                  </div>

                  {/* Embedded Google Map */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                      <Icons.MapPin className="text-legal-gold" size={20} /> 
                      Localização
                    </h4>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-600 relative bg-gray-800">
                      <iframe 
                        title="Mapa de Localização - Fórum de Cariacica" 
                        width="100%" 
                        height="100%" 
                        src="https://maps.google.com/maps?q=F%C3%B3rum+Desembargador+Am%C3%A9rico+Ribeiro+Coelho,+R.+Meridional,+1000+-+Alto+Lage,+Cariacica+-+ES&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full filter hover:brightness-110 transition-all duration-300 border-0"
                      ></iframe>
                    </div>
                    <a 
                      href="https://maps.google.com/maps?q=F%C3%B3rum+Desembargador+Am%C3%A9rico+Ribeiro+Coelho,+R.+Meridional,+1000+-+Alto+Lage,+Cariacica+-+ES" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-legal-gold hover:text-white mt-3 text-sm transition-colors"
                    >
                      <Icons.ExternalLink size={14} /> Abrir no Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg p-8 text-gray-800 shadow-2xl h-fit">
                <h3 className="text-2xl font-serif font-bold text-legal-blue mb-6">Envie sua Mensagem</h3>
                <form className="space-y-4" action="#" method="POST">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold mb-1">Nome Completo <span className="text-red-600" aria-hidden="true">*</span></label>
                      <input 
                        id="contact-name"
                        name="name"
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors" 
                        required
                        aria-required="true"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold mb-1">Telefone <span className="text-red-600" aria-hidden="true">*</span></label>
                      <input 
                        id="contact-phone"
                        name="phone"
                        type="tel" 
                        className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors" 
                        required
                        aria-required="true"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold mb-1">E-mail <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input 
                      id="contact-email"
                      name="email"
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors" 
                      required
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold mb-1">Assunto <span className="text-red-600" aria-hidden="true">*</span></label>
                    <select 
                      id="contact-subject"
                      name="subject"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
                      required
                      aria-required="true"
                    >
                      <option value="">Selecione...</option>
                      <option value="informacao">Informação Processual</option>
                      <option value="agendamento">Agendamento</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold mb-1">Mensagem <span className="text-red-600" aria-hidden="true">*</span></label>
                    <textarea 
                      id="contact-message"
                      name="message"
                      rows={4} 
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors resize-none"
                      required
                      aria-required="true"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-legal-blue hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Icons.Send size={18} /> Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

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

      <Chatbot isOpen={isChatOpen} onToggle={setIsChatOpen} />
      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsOfUse isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
};

export default App;
