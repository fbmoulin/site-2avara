import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { EmailService } from '../services/email.service.js';

const emailService = new EmailService();

export class AppointmentController {
  async create(req: Request, res: Response) {
    try {
      const { type, withWhom, name, oabNumber, processNumber, reason } = req.body;

      // Salvar no banco de dados
      const appointment = await prisma.appointment.create({
        data: {
          type,
          withWhom,
          name,
          oabNumber: oabNumber || null,
          processNumber,
          reason,
          status: 'pre_reserved',
        },
      });

      // Enviar email para a secretaria
      const emailSent = await emailService.sendNewAppointmentNotification({
        type,
        withWhom,
        name,
        oabNumber,
        processNumber,
        reason,
      });

      console.log(`📅 Novo agendamento: ${appointment.id} (Email enviado: ${emailSent})`);

      return res.status(201).json({
        success: true,
        message: 'Sua solicitação de agendamento foi pré-reservada. A secretaria entrará em contato em breve para confirmar o horário.',
        id: appointment.id,
      });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar seu agendamento. Por favor, tente novamente.',
      });
    }
  }
}
