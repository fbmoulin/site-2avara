import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { EmailService } from '../services/email.service.js';

const emailService = new EmailService();

export class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { name, phone, email, subject, message } = req.body;

      // Salvar no banco de dados
      const contact = await prisma.contactMessage.create({
        data: {
          name,
          phone,
          email,
          subject,
          message,
          status: 'pending',
        },
      });

      // Enviar email para a secretaria
      const emailSent = await emailService.sendNewContactNotification({
        name,
        phone,
        email,
        subject,
        message,
      });

      console.log(`📝 Nova mensagem de contato: ${contact.id} (Email enviado: ${emailSent})`);

      return res.status(201).json({
        success: true,
        message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.',
        id: contact.id,
      });
    } catch (error) {
      console.error('Erro ao criar contato:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar sua mensagem. Por favor, tente novamente.',
      });
    }
  }
}
