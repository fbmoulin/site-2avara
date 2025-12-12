import React from 'react';
import { Icons } from '../Icons';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-16 bg-white" aria-label="Equipe do Gabinete">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icons.Users className="text-legal-gold" size={28} />
            <h2 className="text-3xl font-serif font-bold text-legal-blue">
              Equipe de Gabinete da 2ª Vara Cível
            </h2>
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
                <span>
                  Assessora de Juiz e Chefe de Gabinete: Andreza Raimundo Lage - Mestre em
                  Processo Civil pela UFES
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Icons.User className="text-legal-blue" size={18} />
                <span>Assessora de Juiz: Scarllety Viana Scardua - Graduada em Direito</span>
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
                <span>Estagiária de Pós-Graduação: Mariana Vieira Fernandes</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Icons.User className="text-legal-blue" size={18} />
                <span>Estagiária de Graduação: Juliana Ramalho Santos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
