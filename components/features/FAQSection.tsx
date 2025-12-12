import React, { useState } from 'react';
import { Icons } from '../Icons';
import { FAQS } from '../../constants';
import { NavigationSection } from '../../types';

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-serif font-bold mb-3 text-legal-blue">{title}</h2>
    <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
    {subtitle && <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>}
  </div>
);

export const FAQSection: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section
      id={NavigationSection.FAQ}
      className="py-20 bg-white"
      aria-label="Perguntas Frequentes"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Perguntas Frequentes"
          subtitle="Encontre respostas para as dúvidas mais comuns."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={expandedFaq === index}
              >
                <span className="font-semibold text-legal-blue">{faq.question}</span>
                <Icons.ChevronDown
                  className={`text-legal-gold transform transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
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
  );
};

export default FAQSection;
