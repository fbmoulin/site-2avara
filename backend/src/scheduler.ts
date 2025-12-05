import cron from 'node-cron';
import { fetchAndSaveNews } from './services/news.service';

export function initScheduler(): void {
  cron.schedule('0 9 * * *', async () => {
    console.log('[Scheduler] Running daily news fetch at 9:00 AM...');
    const result = await fetchAndSaveNews();
    if (result.success) {
      console.log(`[Scheduler] Successfully fetched ${result.count} news items`);
    } else {
      console.error('[Scheduler] Failed to fetch news:', result.error);
    }
  }, {
    timezone: 'America/Sao_Paulo'
  });
  
  console.log('[Scheduler] News fetch scheduled for 9:00 AM daily (America/Sao_Paulo)');
}

export async function runInitialFetch(): Promise<void> {
  console.log('[Scheduler] Running initial news fetch...');
  const result = await fetchAndSaveNews();
  if (result.success) {
    console.log(`[Scheduler] Initial fetch complete: ${result.count} news items`);
  } else {
    console.error('[Scheduler] Initial fetch failed:', result.error);
  }
}
