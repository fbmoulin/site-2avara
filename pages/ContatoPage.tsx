import React from 'react';
import { Icons } from '../components/Icons';
import { CONTACT_INFO } from '../constants';

const ContatoPage: React.FC = () => {
  return (
    <section className="bg-legal-blue text-white py-20" aria-label="Contato">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-white mb-3">Contato</h1>
          <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Entre em contato conosco através dos canais disponíveis ou envie uma mensagem pelo formulário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-8 text-white">Canais de Atendimento</h2>
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
  );
};

export default ContatoPage;
