import { Router } from 'express';
import {
  createShortLinkController,
  getAllShortLinkController,
} from './shortener.controller';

export const shortRoutes = Router();

shortRoutes
  .route('/')
  .get(getAllShortLinkController)
  .post(createShortLinkController);
