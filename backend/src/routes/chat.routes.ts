import { Router, Request, Response } from 'express';
import { getChatResponse, clearChatSession } from '../services/chat.service.js';
import { z } from 'zod';

const router = Router();

const chatMessageSchema = z.object({
  message: z.string().min(1, 'Mensagem é obrigatória'),
  sessionId: z.string().min(1, 'ID da sessão é obrigatório'),
});

const clearSessionSchema = z.object({
  sessionId: z.string().min(1, 'ID da sessão é obrigatório'),
});

router.post('/', async (req: Request, res: Response) => {
  const result = chatMessageSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors,
    });
  }

  try {
    const { message, sessionId } = result.data;
    const response = await getChatResponse(sessionId, message);

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Erro no chat:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar mensagem do chat',
    });
  }
});

router.post('/clear', async (req: Request, res: Response) => {
  const result = clearSessionSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors,
    });
  }

  try {
    const { sessionId } = result.data;
    clearChatSession(sessionId);

    res.json({
      success: true,
      message: 'Sessão de chat encerrada',
    });
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao encerrar sessão do chat',
    });
  }
});

export default router;
