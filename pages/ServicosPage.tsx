import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { SERVICES, FAQS } from '../constants';
import { useUI } from '../contexts/UIContext';
import zoomTutorialImage from '@assets/stock_images/zoom_video_conferenc_61e7f082.jpg';

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-serif font-bold mb-3 text-legal-blue">
      {title}
    </h2>
    <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
    {subtitle && <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>}
  </div>
);

const ServicosPage: React.FC = () => {
  const { setIsChatOpen } = useUI();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

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
    <>
      <section className="py-20 bg-light-bg" aria-label="Serviços Online">
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

      <section className="py-20 bg-white" aria-label="Perguntas Frequentes">
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
    </>
  );
};

export default ServicosPage;
