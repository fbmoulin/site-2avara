import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Regex patterns for validation
const PHONE_REGEX = /^[\d\s\-\(\)\+]+$/;
const PROCESS_NUMBER_REGEX = /^[\d\.\-\/]+$/;

// Schema para validação de contato
export const contactSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
  phone: z.string()
    .min(10, 'Telefone inválido')
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .regex(PHONE_REGEX, 'Telefone contém caracteres inválidos'),
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase(),
  subject: z.string()
    .min(3, 'Assunto deve ter no mínimo 3 caracteres')
    .max(100, 'Assunto deve ter no máximo 100 caracteres')
    .trim(),
  message: z.string()
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(5000, 'Mensagem deve ter no máximo 5000 caracteres')
    .trim(),
});

// Schema para validação de agendamento
export const appointmentSchema = z.object({
  type: z.enum(['presencial', 'virtual'], {
    errorMap: () => ({ message: 'Tipo deve ser "presencial" ou "virtual"' }),
  }),
  withWhom: z.enum(['assessoria', 'juiz'], {
    errorMap: () => ({ message: 'withWhom deve ser "assessoria" ou "juiz"' }),
  }),
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
  oabNumber: z.string()
    .max(20, 'Número da OAB deve ter no máximo 20 caracteres')
    .optional(),
  processNumber: z.string()
    .min(1, 'Número do processo é obrigatório')
    .max(30, 'Número do processo deve ter no máximo 30 caracteres')
    .regex(PROCESS_NUMBER_REGEX, 'Formato do número do processo inválido'),
  reason: z.string()
    .min(10, 'Motivo deve ter no mínimo 10 caracteres')
    .max(5000, 'Motivo deve ter no máximo 5000 caracteres')
    .trim(),
});

// Schema para validação de demanda
export const demandSchema = z.object({
  processNumber: z.string()
    .min(1, 'Número do processo é obrigatório')
    .max(30, 'Número do processo deve ter no máximo 30 caracteres')
    .regex(PROCESS_NUMBER_REGEX, 'Formato do número do processo inválido'),
  demandType: z.enum(['reclamacao', 'celeridade', 'peticao_urgente'], {
    errorMap: () => ({ message: 'Tipo de demanda inválido' }),
  }),
  description: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(5000, 'Descrição deve ter no máximo 5000 caracteres')
    .trim(),
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
