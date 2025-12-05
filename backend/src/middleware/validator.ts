import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Schema para validação de contato
export const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(255),
  phone: z.string().min(10, 'Telefone inválido (inclua o DDD)').max(20),
  email: z.string().email('Email inválido'),
  userType: z.enum(['parte', 'advogado'], {
    errorMap: () => ({ message: 'Informe se é parte ou advogado' }),
  }),
  cpf: z.string().optional(),
  oab: z.string().optional(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres').max(5000),
}).refine((data) => {
  if (data.userType === 'parte') {
    return data.cpf && data.cpf.length >= 11;
  }
  if (data.userType === 'advogado') {
    return data.oab && data.oab.length >= 4;
  }
  return true;
}, {
  message: 'CPF ou OAB é obrigatório conforme o tipo selecionado',
  path: ['cpf'],
});

// Schema para validação de agendamento
export const appointmentSchema = z.object({
  type: z.enum(['presencial', 'virtual'], {
    errorMap: () => ({ message: 'Tipo deve ser "presencial" ou "virtual"' }),
  }),
  withWhom: z.enum(['assessoria', 'juiz'], {
    errorMap: () => ({ message: 'withWhom deve ser "assessoria" ou "juiz"' }),
  }),
  name: z.string().min(3).max(255),
  oabNumber: z.string().max(50).optional(),
  processNumber: z.string().min(1, 'Número do processo é obrigatório').max(50),
  reason: z.string().min(10, 'Motivo deve ter no mínimo 10 caracteres').max(5000),
});

// Schema para validação de demanda
export const demandSchema = z.object({
  processNumber: z.string().min(1).max(50),
  demandType: z.enum(['reclamacao', 'celeridade', 'peticao_urgente'], {
    errorMap: () => ({ message: 'Tipo de demanda inválido' }),
  }),
  description: z.string().min(10).max(5000),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional().default('normal'),
});

// Middleware genérico de validação
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}
