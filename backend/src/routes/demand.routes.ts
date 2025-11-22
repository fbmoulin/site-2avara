import { Router } from 'express';
import { DemandController } from '../controllers/demand.controller.js';
import { validate, demandSchema } from '../middleware/validator.js';
import { demandLimiter } from '../middleware/rateLimiter.js';

const router = Router();
const controller = new DemandController();

// POST /api/demands - Criar nova demanda
router.post(
  '/',
  demandLimiter,
  validate(demandSchema),
  (req, res) => controller.create(req, res)
);

export default router;
