// Production server that serves static frontend and proxies API to backend
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// In production, Replit sets PORT which maps to external port 80
const PORT = process.env.PORT || 5000;
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;

// Set production environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Proxy /api requests to backend
app.use('/api', createProxyMiddleware({
  target: `http://localhost:${BACKEND_PORT}`,
  changeOrigin: true,
  logLevel: 'warn'
}));

// Serve static frontend files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🏛️  2ª Vara Cível - Production Server                ║
╠════════════════════════════════════════════════════════╣
║  Server: http://0.0.0.0:${PORT}                          ║
║  Proxying /api → http://localhost:${BACKEND_PORT}      ║
╚════════════════════════════════════════════════════════╝
  `);
});
