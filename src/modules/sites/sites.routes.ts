import { Router } from 'express';
import {
  createSitesController,
  deleteSitesController,
  getAllSitesController,
} from './sites.controller';

export const sitesRoutes = Router();

sitesRoutes.route('/').get(getAllSitesController).post(createSitesController);

sitesRoutes.route('/:id').delete(deleteSitesController);
