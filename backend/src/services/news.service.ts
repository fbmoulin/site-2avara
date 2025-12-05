import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const NEWS_CATEGORY_URL = 'https://www.tjes.jus.br/category/s1-front-page/ultimasnoticias/';
const RSS_FEED_URL = 'https://www.tjes.jus.br/category/s1-front-page/ultimasnoticias/feed/';
const PROXY_RSS_URL = 'https://r.jina.ai/https://www.tjes.jus.br/category/s1-front-page/ultimasnoticias/feed/';
const PROXY_NEWS_URL = 'https://r.jina.ai/https://www.tjes.jus.br/category/s1-front-page/ultimasnoticias/';
const MAX_NEWS_ITEMS = 10;

let consecutiveFailures = 0;
let lastFailureTime: Date | null = null;
const BACKOFF_HOURS = 6;

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  category?: string;
}

const FALLBACK_NEWS = [
  { title: 'Confira as últimas notícias do TJES', date: '05/12', link: NEWS_CATEGORY_URL },
  { title: 'Acompanhe as novidades da Justiça Estadual', date: '04/12', link: NEWS_CATEGORY_URL },
  { title: 'Acesse o portal de notícias do Tribunal', date: '03/12', link: NEWS_CATEGORY_URL },
];

function parseRSSDate(dateStr: string): Date {
  return new Date(dateStr);
}

function extractGuid(guidStr: string): string {
  const match = guidStr.match(/\?p=(\d+)/);
  return match ? match[1] : guidStr;
}

function cleanDescription(desc: string): string {
  return desc
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&#8211;/g, '-')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\[&#8230;\]/g, '...')
    .replace(/&#160;/g, ' ')
    .trim();
}

function parseRSSFeed(xmlText: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
    const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/);
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const guidMatch = itemContent.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
    const categoryMatch = itemContent.match(/<category>([\s\S]*?)<\/category>/);
    
    if (titleMatch && linkMatch && pubDateMatch && guidMatch) {
      const title = cleanDescription(titleMatch[1]);
      
      if (title.length > 10) {
        items.push({
          title,
          link: linkMatch[1].trim(),
          description: descMatch ? cleanDescription(descMatch[1]) : '',
          pubDate: pubDateMatch[1].trim(),
          guid: extractGuid(guidMatch[1].trim()),
          category: categoryMatch ? cleanDescription(categoryMatch[1]) : 'Notícia'
        });
      }
    }
  }
  
  return items.slice(0, MAX_NEWS_ITEMS);
}

function parseHTMLNews(htmlText: string): RSSItem[] {
  const items: RSSItem[] = [];
  const newsRegex = /\[([^\]]+?)\s*-{3,}\s*\]\((https:\/\/www\.tjes\.jus\.br\/[a-z0-9-]+\/)\)/gi;
  let match;
  
  while ((match = newsRegex.exec(htmlText)) !== null && items.length < MAX_NEWS_ITEMS) {
    const title = match[1].replace(/\*\*/g, '').replace(/-+$/, '').trim();
    const link = match[2];
    
    if (title.length > 15 && 
        !link.includes('/category/') &&
        !link.includes('/page/') &&
        !link.includes('/institucional/') &&
        !link.includes('/consultas/') &&
        !link.includes('/servicos/') &&
        !link.includes('/portal-transparencia/')) {
      const guidMatch = link.match(/tjes\.jus\.br\/([a-z0-9-]+)\/?$/);
      const slug = guidMatch ? guidMatch[1] : link;
      
      if (!items.some(item => item.guid === slug)) {
        items.push({
          title,
          link,
          description: '',
          pubDate: new Date().toISOString(),
          guid: slug,
          category: 'Notícia'
        });
      }
    }
  }
  
  return items;
}

async function tryFetchRSS(url: string, source: string): Promise<RSSItem[] | null> {
  try {
    console.log(`[News] Trying ${source}: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9'
      },
      timeout: 30000,
      maxRedirects: 5
    });
    
    if (response.status === 200 && response.data) {
      const items = parseRSSFeed(response.data);
      if (items.length > 0) {
        console.log(`[News] ${source} returned ${items.length} items`);
        return items;
      }
    }
  } catch (error) {
    console.log(`[News] ${source} failed:`, error instanceof Error ? error.message : 'Unknown error');
  }
  return null;
}

async function tryFetchHTML(url: string): Promise<RSSItem[] | null> {
  try {
    console.log(`[News] Trying HTML fallback: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,*/*',
        'Accept-Language': 'pt-BR,pt;q=0.9'
      },
      timeout: 30000
    });
    
    if (response.status === 200 && response.data) {
      const items = parseHTMLNews(response.data);
      if (items.length > 0) {
        console.log(`[News] HTML fallback returned ${items.length} items`);
        return items;
      }
    }
  } catch (error) {
    console.log(`[News] HTML fallback failed:`, error instanceof Error ? error.message : 'Unknown error');
  }
  return null;
}

function shouldSkipFetch(): boolean {
  if (consecutiveFailures >= 3 && lastFailureTime) {
    const hoursSinceFailure = (Date.now() - lastFailureTime.getTime()) / (1000 * 60 * 60);
    if (hoursSinceFailure < BACKOFF_HOURS) {
      console.log(`[News] Skipping fetch due to ${consecutiveFailures} consecutive failures. Retry in ${Math.round(BACKOFF_HOURS - hoursSinceFailure)}h`);
      return true;
    }
  }
  return false;
}

export async function fetchAndSaveNews(): Promise<{ success: boolean; count: number; error?: string; source?: string }> {
  if (shouldSkipFetch()) {
    return { success: false, count: 0, error: 'Backoff active due to consecutive failures' };
  }
  
  try {
    console.log(`[News] Starting multi-strategy fetch...`);
    
    let items: RSSItem[] | null = null;
    let source = '';
    
    items = await tryFetchRSS(RSS_FEED_URL, 'Direct RSS');
    if (items) source = 'direct';
    
    if (!items) {
      items = await tryFetchRSS(PROXY_RSS_URL, 'Proxy RSS');
      if (items) source = 'proxy-rss';
    }
    
    if (!items) {
      items = await tryFetchHTML(PROXY_NEWS_URL);
      if (items) source = 'proxy-html';
    }
    
    if (!items || items.length === 0) {
      consecutiveFailures++;
      lastFailureTime = new Date();
      console.log(`[News] All strategies failed (attempt ${consecutiveFailures})`);
      return { 
        success: false, 
        count: 0, 
        error: 'All fetch strategies failed'
      };
    }
    
    consecutiveFailures = 0;
    lastFailureTime = null;
    
    let savedCount = 0;
    
    for (const item of items) {
      try {
        await prisma.news.upsert({
          where: { externalId: item.guid },
          update: {
            title: item.title,
            link: item.link,
            description: item.description,
            category: item.category,
            publishedAt: parseRSSDate(item.pubDate),
            isActive: true
          },
          create: {
            externalId: item.guid,
            title: item.title,
            link: item.link,
            description: item.description,
            category: item.category,
            publishedAt: parseRSSDate(item.pubDate),
            isActive: true
          }
        });
        savedCount++;
      } catch (err) {
        console.error(`[News] Error saving item ${item.guid}:`, err);
      }
    }
    
    console.log(`[News] Saved ${savedCount} items via ${source}`);
    return { success: true, count: savedCount, source };
    
  } catch (error) {
    consecutiveFailures++;
    lastFailureTime = new Date();
    console.error('[News] Error in fetchAndSaveNews:', error);
    return { 
      success: false, 
      count: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

interface NewsItem {
  id: string;
  title: string;
  link: string;
  description: string | null;
  category: string | null;
  publishedAt: Date;
  date?: string;
}

export async function getActiveNews(limit: number = 10): Promise<NewsItem[]> {
  try {
    const news = await prisma.news.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        link: true,
        description: true,
        category: true,
        publishedAt: true
      }
    });
    
    if (news.length > 0) {
      return news.map((item: any) => ({
        ...item,
        date: formatDatePtBr(item.publishedAt)
      }));
    }
    
    return FALLBACK_NEWS.map((item, idx) => ({
      id: `fallback-${idx}`,
      title: item.title,
      link: item.link,
      description: null,
      category: 'Notícia',
      publishedAt: new Date(),
      date: item.date
    }));
  } catch (error) {
    console.error('[News] Error getting news:', error);
    return FALLBACK_NEWS.map((item, idx) => ({
      id: `fallback-${idx}`,
      title: item.title,
      link: item.link,
      description: null,
      category: 'Notícia',
      publishedAt: new Date(),
      date: item.date
    }));
  }
}

function formatDatePtBr(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
}

export async function getLastFetchTime(): Promise<Date | null> {
  try {
    const latest = await prisma.news.findFirst({
      orderBy: { fetchedAt: 'desc' },
      select: { fetchedAt: true }
    });
    return latest?.fetchedAt || null;
  } catch {
    return null;
  }
}

export function getFetchStatus(): { consecutiveFailures: number; lastFailureTime: Date | null; backoffHours: number } {
  return { consecutiveFailures, lastFailureTime, backoffHours: BACKOFF_HOURS };
}
