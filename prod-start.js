import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting production server...');

const backendPath = join(__dirname, 'backend', 'dist', 'server.js');
const backend = spawn('node', [backendPath], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

backend.on('error', (err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});

backend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Backend exited with code ${code}`);
    process.exit(code);
  }
});

setTimeout(async () => {
  const { default: startFrontend } = await import('./prod-server.js');
}, 2000);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down...');
  backend.kill('SIGTERM');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down...');
  backend.kill('SIGINT');
  process.exit(0);
});
