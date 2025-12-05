export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
}

const API_URL = '/api/articles';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/${slug}`);
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}
