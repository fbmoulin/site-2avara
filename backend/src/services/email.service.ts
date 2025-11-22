import { sendEmail } from '../config/email.js';

export class EmailService {
  private secretaryEmail: string;

  constructor() {
    this.secretaryEmail = process.env.EMAIL_TO || '2varacivel@tjes.jus.br';
  }

  // Email de novo contato
  async sendNewContactNotification(contact: {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    const text = `
Nova mensagem de contato recebida:

Nome: ${contact.name}
Telefone: ${contact.phone}
Email: ${contact.email}
Assunto: ${contact.subject}

Mensagem:
${contact.message}

---
Enviado via Portal da 2ª Vara Cível de Cariacica
    `.trim();

    const html = `
      <h2>Nova Mensagem de Contato</h2>
      <table>
        <tr><td><strong>Nome:</strong></td><td>${contact.name}</td></tr>
        <tr><td><strong>Telefone:</strong></td><td>${contact.phone}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${contact.email}</td></tr>
        <tr><td><strong>Assunto:</strong></td><td>${contact.subject}</td></tr>
      </table>
      <h3>Mensagem:</h3>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <small>Enviado via Portal da 2ª Vara Cível de Cariacica</small>
    `;

    return sendEmail({
      to: this.secretaryEmail,
      subject: `Novo Contato: ${contact.subject}`,
      text,
      html,
    });
  }

  // Email de novo agendamento
  async sendNewAppointmentNotification(appointment: {
    type: string;
    withWhom: string;
    name: string;
    oabNumber?: string;
    processNumber: string;
    reason: string;
  }): Promise<boolean> {
    const typeLabel = appointment.type === 'presencial' ? 'Presencial' : 'Virtual (Zoom)';
    const withWhomLabel = appointment.withWhom === 'juiz' ? 'Juiz' : 'Assessoria';

    const text = `
Novo agendamento solicitado:

Tipo: ${typeLabel}
Com quem: ${withWhomLabel}
Nome: ${appointment.name}
${appointment.oabNumber ? `OAB: ${appointment.oabNumber}` : ''}
Nº do Processo: ${appointment.processNumber}

Motivo:
${appointment.reason}

---
Acesse o painel administrativo para confirmar o agendamento.
    `.trim();

    const html = `
      <h2>Novo Agendamento Solicitado</h2>
      <table>
        <tr><td><strong>Tipo:</strong></td><td>${typeLabel}</td></tr>
        <tr><td><strong>Com quem:</strong></td><td>${withWhomLabel}</td></tr>
        <tr><td><strong>Nome:</strong></td><td>${appointment.name}</td></tr>
        ${appointment.oabNumber ? `<tr><td><strong>OAB:</strong></td><td>${appointment.oabNumber}</td></tr>` : ''}
        <tr><td><strong>Processo:</strong></td><td>${appointment.processNumber}</td></tr>
      </table>
      <h3>Motivo:</h3>
      <p>${appointment.reason.replace(/\n/g, '<br>')}</p>
      <hr>
      <small>Acesse o painel administrativo para confirmar o agendamento.</small>
    `;

    return sendEmail({
      to: this.secretaryEmail,
      subject: `Novo Agendamento: ${appointment.name} - ${typeLabel}`,
      text,
      html,
    });
  }

  // Email de nova demanda
  async sendNewDemandNotification(demand: {
    processNumber: string;
    demandType: string;
    description: string;
    priority: string;
  }): Promise<boolean> {
    const typeLabels: Record<string, string> = {
      'reclamacao': 'Reclamação',
      'celeridade': 'Pedido de Celeridade',
      'peticao_urgente': 'Petição Urgente',
    };

    const typeLabel = typeLabels[demand.demandType] || demand.demandType;
    const priorityEmoji = demand.priority === 'urgent' ? '🔴' : demand.priority === 'high' ? '🟠' : '🟢';

    const text = `
${priorityEmoji} Nova demanda registrada:

Tipo: ${typeLabel}
Nº do Processo: ${demand.processNumber}
Prioridade: ${demand.priority}

Descrição:
${demand.description}

---
Acesse o painel administrativo para analisar a demanda.
    `.trim();

    const html = `
      <h2>${priorityEmoji} Nova Demanda Registrada</h2>
      <table>
        <tr><td><strong>Tipo:</strong></td><td>${typeLabel}</td></tr>
        <tr><td><strong>Processo:</strong></td><td>${demand.processNumber}</td></tr>
        <tr><td><strong>Prioridade:</strong></td><td>${demand.priority}</td></tr>
      </table>
      <h3>Descrição:</h3>
      <p>${demand.description.replace(/\n/g, '<br>')}</p>
      <hr>
      <small>Acesse o painel administrativo para analisar a demanda.</small>
    `;

    return sendEmail({
      to: this.secretaryEmail,
      subject: `${priorityEmoji} Nova Demanda: ${typeLabel} - Processo ${demand.processNumber}`,
      text,
      html,
    });
  }
}
