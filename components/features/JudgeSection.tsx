import React from 'react';
import { Icons } from '../Icons';
import { JUDGE_INFO } from '../../constants';
import { NavigationSection } from '../../types';
import forumImage from '@assets/forum_1764897995940.jpg';

export const JudgeSection: React.FC = () => {
  return (
    <section
      id={NavigationSection.JUDGE}
      className="py-20 bg-white"
      aria-label="Informações do Magistrado"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 relative">
            <div
              className="absolute top-4 left-4 w-full h-full border-2 border-legal-gold rounded-lg -z-0"
              aria-hidden="true"
            ></div>
            <img
              src={forumImage}
              alt="Fórum Des. Américo Ribeiro Coelho - Cariacica"
              className="w-full h-auto rounded-lg shadow-xl relative z-10 bg-gray-200"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-0.5 w-10 bg-legal-gold" aria-hidden="true"></div>
              <span className="text-legal-gold font-bold uppercase tracking-wider text-sm">
                O Magistrado
              </span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-legal-blue mb-2">
              {JUDGE_INFO.name}
            </h2>
            <h3 className="text-xl text-gray-500 mb-6 italic">{JUDGE_INFO.role}</h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">{JUDGE_INFO.bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-legal-blue">
                <Icons.Scale className="text-legal-blue mb-3" size={24} aria-hidden="true" />
                <h4 className="font-bold text-legal-blue mb-2">Missão</h4>
                <p className="text-sm text-gray-600">
                  Garantir a resolução de conflitos com ética, imparcialidade e agilidade.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-legal-gold">
                <Icons.Users className="text-legal-gold mb-3" size={24} aria-hidden="true" />
                <h4 className="font-bold text-legal-blue mb-2">Visão</h4>
                <p className="text-sm text-gray-600">
                  Ser referência em atendimento humanizado e eficiência processual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JudgeSection;
