import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller.js';
import { validate, appointmentSchema } from '../middleware/validator.js';
import { appointmentLimiter } from '../middleware/rateLimiter.js';

const router = Router();
const controller = new AppointmentController();

// POST /api/appointments - Criar novo agendamento
router.post(
  '/',
  appointmentLimiter,
  validate(appointmentSchema),
  (req, res) => controller.create(req, res)
);

export default router;
