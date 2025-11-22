import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import { Chatbot } from './components/Chatbot';
import { 
  SERVICES, 
  FAQS, 
  LATEST_NEWS, 
  JUDGE_INFO, 
  CONTACT_INFO 
} from './constants';
import { NavigationSection } from './types';

// Helper component for Section Headers
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
  const [fontSize, setFontSize] = useState(0); // 0=normal, 1=lg, 2=xl
  const [highContrast, setHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle scroll spy to update active nav link
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

  // Accessibility & Theme Effect
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Font Size
    html.classList.remove('font-lg', 'font-xl');
    if (fontSize === 1) html.classList.add('font-lg');
    if (fontSize === 2) html.classList.add('font-xl');

    // High Contrast
    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Dark Mode
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
      // Move focus to the section for accessibility
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

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col transition-colors duration-300">
      {/* Acessibilidade: Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-legal-gold focus:text-white focus:px-4 focus:py-2 focus:rounded shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* BARRA DE ACESSIBILIDADE (Top Bar) */}
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
             
             {/* Contrast and Theme Toggles */}
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

      {/* Header */}
      <header id="menu" className="sticky w-full top-0 z-40 bg-legal-blue shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div 
              className="flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-legal-gold rounded-sm p-1" 
              onClick={() => scrollToSection(NavigationSection.HOME)}
              role="button"
              tabIndex={0}
              aria-label="Ir para o início"
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(NavigationSection.HOME)}
            >
              <div className="bg-legal-gold p-2 rounded-sm">
                <Icons.Scale className="text-white" size={24} aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-legal-gold text-xs font-bold tracking-widest uppercase">Poder Judiciário</span>
                <span className="text-white font-serif font-bold text-lg leading-tight">2ª Vara Cível</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8" aria-label="Navegação Principal">
              <NavLink section={NavigationSection.HOME} label="Início" />
              <NavLink section={NavigationSection.INSTITUTIONAL} label="Institucional" />
              <NavLink section={NavigationSection.JUDGE} label="Magistrado" />
              <NavLink section={NavigationSection.SERVICES} label="Serviços" />
              <NavLink section={NavigationSection.FAQ} label="Dúvidas" />
              <NavLink section={NavigationSection.CONTACT} label="Contato" />
            </nav>

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-xl">
            <NavLink mobile section={NavigationSection.HOME} label="Início" />
            <NavLink mobile section={NavigationSection.INSTITUTIONAL} label="Institucional" />
            <NavLink mobile section={NavigationSection.JUDGE} label="Magistrado" />
            <NavLink mobile section={NavigationSection.SERVICES} label="Serviços" />
            <NavLink mobile section={NavigationSection.FAQ} label="Dúvidas" />
            <NavLink mobile section={NavigationSection.CONTACT} label="Contato" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        
        {/* HERO SECTION */}
        <section id={NavigationSection.HOME} className="relative h-[600px] flex items-center justify-center bg-gray-900" aria-label="Introdução">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://picsum.photos/1920/1080?grayscale" 
              alt="Fachada do tribunal em tons de cinza" 
              className="w-full h-full object-cover opacity-30"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-legal-blue via-legal-blue/50 to-transparent opacity-90"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="mb-4 inline-block px-4 py-1 border border-legal-gold text-legal-gold uppercase tracking-widest text-xs font-bold rounded-full bg-legal-blue/50 backdrop-blur-sm">
              Comarca de Cariacica - ES
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
                onClick={() => scrollToSection(NavigationSection.CONTACT)}
                className="px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-legal-blue font-bold rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-legal-gold"
              >
                Fale Conosco
              </button>
            </div>
          </div>
        </section>

        {/* LATEST NEWS TICKER */}
        <div className="bg-gray-100 border-b border-gray-200 py-3" role="complementary" aria-label="Últimas Notícias">
          <div className="container mx-auto px-4 flex items-center gap-4 h-12">
            <a 
              href="https://www.tjes.jus.br/canais/noticias/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-lg text-legal-blue uppercase tracking-wider whitespace-nowrap flex items-center gap-2 hover:text-legal-gold transition-colors focus:outline-none focus:underline"
              title="Ir para o site do TJES (Abre em nova aba)"
            >
              Notícias TJES <Icons.ExternalLink size={18} />
            </a>
            <div className="overflow-hidden relative w-full h-full flex items-center" tabIndex={0} aria-label="Lista de notícias em movimento">
              <div className="animate-marquee motion-reduce:animate-none whitespace-nowrap absolute motion-reduce:relative flex items-center">
                {LATEST_NEWS.map((news, idx) => (
                  <a 
                    key={idx} 
                    href="https://www.tjes.jus.br/canais/noticias/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mr-12 text-lg text-gray-700 hover:text-legal-blue transition-colors inline-flex items-center focus:outline-none focus:ring-1 focus:ring-legal-gold rounded px-1"
                  >
                    <span className="font-semibold text-legal-gold mr-2" aria-label={`Data: ${news.date}`}>[{news.date}]</span>
                    {news.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INSTITUTIONAL / JUDGE SECTION */}
        <section id={NavigationSection.JUDGE} className="py-20 bg-white" aria-label="Informações do Magistrado">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3 relative">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-legal-gold rounded-lg -z-0" aria-hidden="true"></div>
                <img 
                  src={JUDGE_INFO.imageUrl} 
                  alt={`Foto do magistrado ${JUDGE_INFO.name}`}
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

        {/* SERVICES SECTION */}
        <section id={NavigationSection.SERVICES} className="py-20 bg-light-bg" aria-label="Serviços Online">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Serviços Online" 
              subtitle="Acesse os principais serviços da vara sem sair de casa, garantindo agilidade e comodidade." 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => {
                const getIcon = (name: string) => {
                  switch(name) {
                    case 'search': return <Icons.Search size={32} aria-hidden="true" />;
                    case 'video': return <Icons.Video size={32} aria-hidden="true" />;
                    case 'calendar': return <Icons.Calendar size={32} aria-hidden="true" />;
                    case 'download': return <Icons.Download size={32} aria-hidden="true" />;
                    case 'file-text': return <Icons.FileText size={16} aria-hidden="true" />;
                    case 'mail': return <Icons.Mail size={16} aria-hidden="true" />;
                    case 'message-square': return <Icons.MessageSquare size={16} aria-hidden="true" />;
                    default: return <Icons.FileText size={32} aria-hidden="true" />;
                  }
                }

                return (
                  <div key={service.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col h-full">
                    <div className="w-16 h-16 bg-legal-blue/5 rounded-full flex items-center justify-center mb-6 text-legal-blue group-hover:bg-legal-gold group-hover:text-white transition-colors duration-300">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-legal-blue mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    
                    {/* Tutorial Section if exists */}
                    {service.tutorial ? (
                      <div className="mb-6 bg-blue-50 p-4 rounded border border-blue-100">
                         <p className="text-xs font-bold text-legal-blue uppercase mb-2 flex items-center gap-1">
                            <Icons.Video size={14} /> Como habilitar o áudio:
                         </p>
                         <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                           {service.tutorial.map((step, idx) => (
                             <li key={idx} className="leading-tight">{step}</li>
                           ))}
                         </ul>
                      </div>
                    ) : null}

                    {/* Actions: Multiple Links or Single URL */}
                    {service.links ? (
                      <div className="mt-auto flex flex-col gap-2 w-full">
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
                    ) : (
                      <a 
                        href={service.url || '#'} 
                        target={service.url ? "_blank" : undefined}
                        rel={service.url ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center text-legal-gold font-semibold hover:text-legal-gold-hover focus:outline-none focus:underline focus:text-legal-blue mt-auto"
                        aria-label={`Acessar serviço de ${service.title} ${service.url ? '(abre em nova aba)' : ''}`}
                      >
                        {service.icon === 'download' ? 'Baixar Aplicativo' : 'Acessar serviço'} 
                        <Icons.Send size={16} className="ml-2" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id={NavigationSection.FAQ} className="py-20 bg-white" aria-label="Perguntas Frequentes">
          <div className="container mx-auto px-4 max-w-4xl">
            <SectionHeader title="Perguntas Frequentes" subtitle="Respostas para as dúvidas mais comuns dos cidadãos." />
            
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.id} className="group bg-white rounded-lg border border-gray-200 open:shadow-md transition-all">
                  <summary className="flex cursor-pointer items-center justify-between p-6 list-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-legal-gold rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-legal-gold uppercase tracking-wide bg-legal-gold/10 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                    </div>
                    <span className="transition group-open:rotate-180">
                      <Icons.ChevronDown className="text-gray-400" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent group-open:border-gray-100 group-open:pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600">Não encontrou o que procurava?</p>
              <button 
                onClick={() => scrollToSection(NavigationSection.CONTACT)}
                className="mt-2 text-legal-gold font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-legal-gold rounded px-2"
              >
                Entre em contato conosco
              </button>
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
                      <Icons.MessageSquare className="text-legal-gold" size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">WhatsApp (Balcão Virtual)</h4>
                      <p className="text-gray-300">{CONTACT_INFO.whatsapp}</p>
                      <p className="text-gray-400 text-sm">Apenas mensagens de texto</p>
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

                  {/* Embedded Map */}
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
                      <label htmlFor="name" className="block text-sm font-semibold mb-1">Nome Completo <span className="text-red-600" aria-hidden="true">*</span></label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors" 
                        required
                        aria-required="true"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-1">Telefone <span className="text-red-600" aria-hidden="true">*</span></label>
                      <input 
                        id="phone"
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
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">E-mail <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors" 
                      required
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-1">Assunto</label>
                    <select 
                      id="subject" 
                      name="subject"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
                    >
                      <option>Dúvida Processual</option>
                      <option>Agendamento</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-1">Mensagem <span className="text-red-600" aria-hidden="true">*</span></label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={4} 
                      className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
                      required
                      aria-required="true"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-legal-blue hover:bg-slate-800 text-white font-bold py-3 rounded transition-colors uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-blue"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="bg-slate-950 text-gray-400 py-8 border-t border-gray-800" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icons.Scale size={20} className="text-gray-600" aria-hidden="true" />
              <span className="font-serif text-sm">© 2023 - 2ª Vara Cível de Cariacica. Todos os direitos reservados.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline">Termos de Uso</a>
              <button 
                onClick={() => {
                  const bar = document.getElementById('accessibility-bar');
                  bar?.scrollIntoView();
                  bar?.focus();
                }}
                className="hover:text-white transition-colors focus:outline-none focus:text-white focus:underline"
              >
                Acessibilidade
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <Chatbot isOpen={isChatOpen} onToggle={setIsChatOpen} />
    </div>
  );
};

export default App;