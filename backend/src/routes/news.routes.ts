import { Router, Request, Response } from 'express';
import { getActiveNews, fetchAndSaveNews, getLastFetchTime, getFetchStatus } from '../services/news.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 20);
    const news = await getActiveNews(limit);
    
    res.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (error) {
    console.error('[News API] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar notícias'
    });
  }
});

router.get('/status', async (req: Request, res: Response) => {
  try {
    const lastFetch = await getLastFetchTime();
    const news = await getActiveNews(1);
    const fetchStatus = getFetchStatus();
    
    res.json({
      success: true,
      data: {
        lastFetch: lastFetch?.toISOString() || null,
        newsCount: news.length > 0 ? (await getActiveNews(100)).length : 0,
        latestNews: news[0] || null,
        fetchStatus: {
          consecutiveFailures: fetchStatus.consecutiveFailures,
          lastFailureTime: fetchStatus.lastFailureTime?.toISOString() || null,
          backoffHours: fetchStatus.backoffHours
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar status'
    });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const result = await fetchAndSaveNews();
    
    if (result.success) {
      res.json({
        success: true,
        message: `${result.count} notícias atualizadas com sucesso`,
        count: result.count
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Erro ao atualizar notícias'
      });
    }
  } catch (error) {
    console.error('[News API] Refresh error:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar notícias'
    });
  }
});

export default router;
