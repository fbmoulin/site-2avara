import rateLimit from 'express-rate-limit';

// Rate limiter para formulário de contato (3 requests a cada 15 minutos)
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3,
  message: {
    success: false,
    message: 'Muitas tentativas de contato. Por favor, aguarde 15 minutos antes de tentar novamente.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para agendamentos (5 requests a cada 15 minutos)
export const appointmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Muitas solicitações de agendamento. Aguarde alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para demandas (10 requests a cada 15 minutos)
export const demandLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Muitas solicitações de demanda. Aguarde alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter geral para API (100 requests por minuto)
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100,
  message: {
    success: false,
    message: 'Muitas requisições. Por favor, tente novamente em breve.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
