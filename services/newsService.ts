const API_URL = '/api/news';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  description: string | null;
  category: string | null;
  publishedAt: string;
  date: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  { id: 'f1', title: 'TJES disponibiliza novos serviços digitais', link: 'https://www.tjes.jus.br/', description: null, category: 'Notícia', publishedAt: new Date().toISOString(), date: '04/12' },
  { id: 'f2', title: 'Balcão Virtual amplia atendimento ao cidadão', link: 'https://www.tjes.jus.br/', description: null, category: 'Notícia', publishedAt: new Date().toISOString(), date: '03/12' },
  { id: 'f3', title: 'Justiça do ES promove semana de conciliação', link: 'https://www.tjes.jus.br/', description: null, category: 'Notícia', publishedAt: new Date().toISOString(), date: '02/12' },
  { id: 'f4', title: 'TJES investe em modernização tecnológica', link: 'https://www.tjes.jus.br/', description: null, category: 'Notícia', publishedAt: new Date().toISOString(), date: '01/12' },
];

export async function fetchNews(limit: number = 10): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}`);
    
    if (!response.ok) {
      console.warn('[NewsService] API returned error, using fallback');
      return FALLBACK_NEWS;
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      return data.data;
    }
    
    return FALLBACK_NEWS;
  } catch (error) {
    console.warn('[NewsService] Failed to fetch news, using fallback:', error);
    return FALLBACK_NEWS;
  }
}
