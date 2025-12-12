import React from 'react';
import { Icons } from '../Icons';
import { NewsItem } from '../../services/newsService';

interface NewsSectionProps {
  newsItems: NewsItem[];
}

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-serif font-bold mb-3 text-legal-blue">{title}</h2>
    <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
    {subtitle && <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>}
  </div>
);

export const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
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
  );
};

export default NewsSection;
