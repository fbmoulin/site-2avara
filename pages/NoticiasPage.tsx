import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { fetchNews, NewsItem } from '../services/newsService';

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-serif font-bold mb-3 text-legal-blue">
      {title}
    </h2>
    <div className="h-1 w-24 mx-auto mb-4 bg-legal-gold"></div>
    {subtitle && <p className="max-w-2xl mx-auto text-gray-600">{subtitle}</p>}
  </div>
);

const NoticiasPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(12).then((items) => {
      setNewsItems(items);
      setLoading(false);
    });
  }, []);

  return (
    <>
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
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Carregando notícias...</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma notícia disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((news) => (
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
    </>
  );
};

export default NoticiasPage;
