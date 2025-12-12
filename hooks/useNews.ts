import { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../services/newsService';

const API_URL = '/api/news';

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fallback-1',
    title: 'Bem-vindo ao Portal da 2ª Vara Cível de Cariacica',
    link: '#',
    publishedAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    description: 'Acompanhe as últimas notícias e atualizações do Tribunal de Justiça do Espírito Santo.',
    category: 'TJES'
  }
];

interface UseNewsResult {
  news: NewsItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNews(limit: number = 10): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?limit=${limit}`);
      
      if (!response.ok) {
        console.warn('[useNews] API returned error, using fallback');
        setNews(FALLBACK_NEWS);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setNews(data.data);
      } else {
        setNews(FALLBACK_NEWS);
      }
    } catch (err) {
      console.warn('[useNews] Failed to fetch news, using fallback:', err);
      setError('Falha ao carregar notícias');
      setNews(FALLBACK_NEWS);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, isLoading, error, refetch: fetchNews };
}

export default useNews;
