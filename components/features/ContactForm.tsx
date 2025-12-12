import React from 'react';
import { Icons } from '../Icons';
import { useContactForm } from '../../hooks/useContactForm';

export const ContactForm: React.FC = () => {
  const {
    formData,
    status,
    message,
    updateField,
    handleSubmit,
    isLoading,
    isSuccess,
    isError,
  } = useContactForm();

  return (
    <div className="bg-white rounded-lg p-8 text-gray-800 shadow-2xl h-fit">
      <h3 className="text-2xl font-serif font-bold text-legal-blue mb-6">
        Envie sua Mensagem
      </h3>

      {isSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
          <Icons.CheckCircle size={20} className="text-green-600" />
          {message}
        </div>
      )}

      {isError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center gap-2">
          <Icons.AlertCircle size={20} className="text-red-600" />
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold mb-1">
              Nome Completo <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              autoComplete="name"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-semibold mb-1">
              Telefone (com DDD) <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="(27) 99999-9999"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              autoComplete="tel"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-email" className="block text-sm font-semibold mb-1">
              E-mail <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="contact-usertype" className="block text-sm font-semibold mb-1">
              Você é <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <select
              id="contact-usertype"
              name="userType"
              value={formData.userType}
              onChange={(e) => updateField('userType', e.target.value as '' | 'parte' | 'advogado')}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              disabled={isLoading}
            >
              <option value="">Selecione...</option>
              <option value="parte">Parte (cidadão)</option>
              <option value="advogado">Advogado(a)</option>
            </select>
          </div>
        </div>
        {formData.userType === 'parte' && (
          <div>
            <label htmlFor="contact-cpf" className="block text-sm font-semibold mb-1">
              CPF <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-cpf"
              name="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => updateField('cpf', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              disabled={isLoading}
            />
          </div>
        )}
        {formData.userType === 'advogado' && (
          <div>
            <label htmlFor="contact-oab" className="block text-sm font-semibold mb-1">
              Número da OAB <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-oab"
              name="oab"
              type="text"
              placeholder="ES 12345"
              value={formData.oab}
              onChange={(e) => updateField('oab', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
              required
              aria-required="true"
              disabled={isLoading}
            />
          </div>
        )}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-semibold mb-1">
            Assunto <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors"
            required
            aria-required="true"
            disabled={isLoading}
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
          <label htmlFor="contact-message" className="block text-sm font-semibold mb-1">
            Mensagem <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:border-legal-gold focus:ring-1 focus:ring-legal-gold outline-none transition-colors resize-none"
            required
            aria-required="true"
            disabled={isLoading}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-legal-blue hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Icons.Loader2 size={18} className="animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Icons.Send size={18} /> Enviar Mensagem
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
