import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
// import { adminJs, adminRouter } from './admin.js'; // Temporariamente desabilitado
import contactRoutes from './routes/contact.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import demandRoutes from './routes/demand.routes.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: false, // AdminJS precisa disso desabilitado
}));

// CORS configurado
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

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

// Rate limiting geral
app.use('/api', apiLimiter);

// Rotas da API
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/demands', demandRoutes);

// Painel AdminJS (temporariamente desabilitado)
// app.use(adminJs.options.rootPath, adminRouter);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: '2ª Vara Cível de Cariacica - API',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      appointments: 'POST /api/appointments',
      demands: 'POST /api/demands',
      admin: 'GET /admin',
      health: 'GET /health',
    },
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🏛️  2ª Vara Cível de Cariacica - API Backend         ║
╠════════════════════════════════════════════════════════╣
║  Servidor rodando em: http://localhost:${PORT}           ║
║  Painel Admin: http://localhost:${PORT}/admin             ║
║  Environment: ${process.env.NODE_ENV || 'development'}                       ║
╚════════════════════════════════════════════════════════╝
  `);
});

export default app;
