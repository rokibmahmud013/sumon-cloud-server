import { Router } from 'express';
import { getAdminBalanceController } from './BalanceCalc.controller';


export const balanceRoutes = Router();

balanceRoutes
  .route('/')
  .get(getAdminBalanceController)



