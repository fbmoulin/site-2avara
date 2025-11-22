import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { EmailService } from '../services/email.service.js';

const emailService = new EmailService();

export class DemandController {
  async create(req: Request, res: Response) {
    try {
      const { processNumber, demandType, description, priority = 'normal' } = req.body;

      // Salvar no banco de dados
      const demand = await prisma.demand.create({
        data: {
          processNumber,
          demandType,
          description,
          priority,
          status: 'pending',
        },
      });

      // Enviar email para a secretaria
      const emailSent = await emailService.sendNewDemandNotification({
        processNumber,
        demandType,
        description,
        priority,
      });

      console.log(`📋 Nova demanda: ${demand.id} (Email enviado: ${emailSent})`);

      return res.status(201).json({
        success: true,
        message: 'Sua demanda foi registrada no sistema interno da Vara e será encaminhada ao setor responsável.',
        id: demand.id,
      });
    } catch (error) {
      console.error('Erro ao criar demanda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao registrar sua demanda. Por favor, tente novamente.',
      });
    }
  }
}
