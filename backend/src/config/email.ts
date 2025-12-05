import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter: nodemailer.Transporter | null = null;

if (process.env.GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM || '2acivelcariacica@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
} else {
  console.warn('⚠️  GMAIL_APP_PASSWORD não configurada. Emails não serão enviados.');
}

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!transporter) {
    console.log('📧 [MODO DEMO] Email que seria enviado:', {
      to: options.to,
      subject: options.subject,
    });
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"2ª Vara Cível de Cariacica" <${process.env.EMAIL_FROM || '2acivelcariacica@gmail.com'}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text.replace(/\n/g, '<br>'),
    });

    console.log(`✅ Email enviado para ${options.to}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return false;
  }
}
