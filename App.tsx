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
            <div className="flex items-center gap-2 bg-gray-800/50 px-2 py-1 rounded high-contrast-ignore">
              <Icons.Accessibility size={14} className="text-legal-gold" aria-hidden="true" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Acessibilidade</span>
            </div>
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

            <nav className="hidden md:flex gap-8" aria-label="Navegação Principal">
              <NavLink section="home" label="Início" />
              <NavLink section="judge" label="Magistrado" />
              <NavLink section="services" label="Serviços" />
              <NavLink section="faq" label="Dúvidas" />
              <NavLink section="contact" label="Contato" />
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

                  {service.links ? (
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
                  ) : service.tutorial ? (
                    <div>
                      <button 
                        onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                        className="flex items-center gap-2 text-legal-blue font-semibold hover:text-legal-gold transition-colors"
                      >
                        {expandedService === service.id ? 'Ver menos' : 'Ver tutorial'}
                        <Icons.ChevronDown className={`transform transition-transform ${expandedService === service.id ? 'rotate-180' : ''}`} size={16} />
                      </button>
                      
                      {expandedService === service.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                            {service.tutorial.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                          {service.tutorialTip && (
                            <p className="mt-3 text-sm text-legal-gold font-semibold">{service.tutorialTip}</p>
                          )}
                          <img 
                            src={zoomTutorialImage} 
                            alt="Exemplo de reunião por videoconferência"
                            className="mt-4 w-full h-auto rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  ) : service.url ? (
                    <a 
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-legal-blue text-white font-semibold rounded hover:bg-legal-blue-light transition-colors"
                    >
                      Acessar
                      <Icons.ExternalLink size={16} />
                    </a>
                  ) : null}
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

        <section id={NavigationSection.CONTACT} className="py-20 bg-legal-blue" aria-label="Contato">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Entre em Contato" 
              subtitle="Estamos à disposição para atendê-lo."
              light 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                <Icons.MapPin className="text-legal-gold mx-auto mb-4" size={32} />
                <h3 className="text-white font-semibold mb-2">Endereço</h3>
                <p className="text-gray-300 text-sm">{CONTACT_INFO.address}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                <Icons.Phone className="text-legal-gold mx-auto mb-4" size={32} />
                <h3 className="text-white font-semibold mb-2">Telefone</h3>
                <p className="text-gray-300 text-sm">{CONTACT_INFO.phone}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                <Icons.Clock className="text-legal-gold mx-auto mb-4" size={32} />
                <h3 className="text-white font-semibold mb-2">Horário</h3>
                <p className="text-gray-300 text-sm">Seg a Sex: 12h às 18h</p>
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
