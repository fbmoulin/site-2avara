import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import session from 'express-session';

const prisma = new PrismaClient();

// Registrar adapter Prisma
AdminJS.registerAdapter({ Database, Resource });

// Configuração do AdminJS
export const adminJs = new AdminJS({
  resources: [
    {
      resource: { model: prisma.contactMessage, client: prisma, dmmf: Prisma.dmmf },
      options: {
        navigation: { name: 'Atendimento', icon: 'Mail' },
        properties: {
          id: { isVisible: { list: false, filter: false, show: true, edit: false } },
          name: { isTitle: true },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          answeredAt: { isVisible: { list: true, filter: true, show: true, edit: true } },
        },
        listProperties: ['name', 'email', 'subject', 'status', 'createdAt'],
        filterProperties: ['name', 'email', 'status', 'createdAt'],
        showProperties: ['name', 'phone', 'email', 'subject', 'message', 'status', 'createdAt', 'answeredAt', 'answeredBy', 'notes'],
        editProperties: ['status', 'answeredBy', 'notes'],
      },
    },
    {
      resource: { model: prisma.appointment, client: prisma, dmmf: Prisma.dmmf },
      options: {
        navigation: { name: 'Atendimento', icon: 'Calendar' },
        properties: {
          id: { isVisible: { list: false, filter: false, show: true, edit: false } },
          name: { isTitle: true },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
        },
        listProperties: ['name', 'type', 'withWhom', 'processNumber', 'status', 'createdAt'],
        filterProperties: ['type', 'withWhom', 'status', 'createdAt'],
        showProperties: ['name', 'oabNumber', 'type', 'withWhom', 'processNumber', 'reason', 'status', 'preferredDate', 'confirmedDate', 'zoomLink', 'createdAt', 'notes'],
        editProperties: ['status', 'confirmedDate', 'confirmedBy', 'zoomLink', 'notes'],
      },
    },
    {
      resource: { model: prisma.demand, client: prisma, dmmf: Prisma.dmmf },
      options: {
        navigation: { name: 'Atendimento', icon: 'AlertCircle' },
        properties: {
          id: { isVisible: { list: false, filter: false, show: true, edit: false } },
          processNumber: { isTitle: true },
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
        },
        listProperties: ['processNumber', 'demandType', 'priority', 'status', 'createdAt'],
        filterProperties: ['demandType', 'priority', 'status', 'createdAt'],
        showProperties: ['processNumber', 'demandType', 'description', 'status', 'priority', 'createdAt', 'resolvedAt', 'resolvedBy', 'resolutionNotes'],
        editProperties: ['status', 'priority', 'resolvedBy', 'resolutionNotes'],
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: '2ª Vara Cível de Cariacica',
    logo: false,
  },
  locale: {
    language: 'pt-BR',
    translations: {
      messages: {
        loginWelcome: 'Painel Administrativo',
      },
      labels: {
        ContactMessage: 'Mensagens de Contato',
        Appointment: 'Agendamentos',
        Demand: 'Demandas',
      },
    },
  },
});

// Autenticação do AdminJS
const authenticate = async (email: string, password: string) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tjes.jus.br';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail) {
    // Em produção, use hash bcrypt armazenado no banco
    const matched = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10));
    if (matched || password === adminPassword) {
      return { email: adminEmail, role: 'admin' };
    }
  }
  return null;
};

// Configuração de sessão (usando MemoryStore para desenvolvimento)
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.SESSION_SECRET || 'change-this-secret-key-in-production',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'change-this-secret-key-in-production',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
    },
    name: 'adminjs.sid',
  }
);
