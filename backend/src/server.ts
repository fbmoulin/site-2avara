import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import demandRoutes from './routes/demand.routes.js';
import chatRoutes from './routes/chat.routes.js';
import newsRoutes from './routes/news.routes.js';
import articleRoutes from './routes/article.routes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { apiTimeout, chatTimeout } from './middleware/timeout.js';
import { requestLogger } from './middleware/logger.js';
import { initScheduler, runInitialFetch } from './scheduler.js';
import { setupAuth } from './middleware/replitAuth.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || '3001', 10);

app.set('trust proxy', 1);

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: false, // AdminJS precisa disso desabilitado
}));

// CORS configurado
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Permite qualquer subdomínio do Replit
    if (origin && origin.includes('.replit.dev')) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin não permitida pelo CORS'));
    }
  },
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use(requestLogger);

// Rate limiting geral
app.use('/api', apiLimiter);

// Request timeout
app.use('/api', apiTimeout);

async function startServer() {
  await setupAuth(app);

  app.use('/api/contact', contactRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/demands', demandRoutes);
  app.use('/api/chat', chatTimeout, chatRoutes);
  app.use('/api/news', newsRoutes);
  app.use('/api/articles', articleRoutes);

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  app.get('/', (req, res) => {
    res.json({
      message: '2ª Vara Cível de Cariacica - API',
      version: '1.0.0',
      endpoints: {
        contact: 'POST /api/contact',
        appointments: 'POST /api/appointments',
        demands: 'POST /api/demands',
        chat: 'POST /api/chat',
        news: 'GET /api/news',
        auth: 'GET /api/auth/user',
        health: 'GET /health',
      },
    });
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Erro não tratado:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Erro interno do servidor',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint não encontrado',
    });
  });

  const HOST = process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0';
  app.listen(PORT, HOST, async () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║  🏛️  2ª Vara Cível de Cariacica - API Backend         ║
╠════════════════════════════════════════════════════════╣
║  Servidor rodando em: http://${HOST}:${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                       ║
╚════════════════════════════════════════════════════════╝
    `);
    
    initScheduler();
    await runInitialFetch();
  });
}

startServer().catch(console.error);

export default app;
