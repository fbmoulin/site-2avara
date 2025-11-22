import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller.js';
import { validate, contactSchema } from '../middleware/validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();
const controller = new ContactController();

// POST /api/contact - Criar nova mensagem de contato
router.post(
  '/',
  contactLimiter,
  validate(contactSchema),
  (req, res) => controller.create(req, res)
);

export default router;
