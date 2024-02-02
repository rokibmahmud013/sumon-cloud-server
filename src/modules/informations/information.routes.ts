import { Router } from 'express';
import {
  createInfoController,
  getAllInfoController,
  updateInfoController,
} from './information.controller';
import { agentMiddleware } from '../../middlewares/agent';

export const infoRoutes = Router();

infoRoutes
  .route('/')
  .get(agentMiddleware, getAllInfoController)
  .post(agentMiddleware, createInfoController);

infoRoutes.route('/:id').patch(updateInfoController);
