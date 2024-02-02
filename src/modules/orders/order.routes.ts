import { Router } from 'express';
import {
  approvalScriptionController,
  createOrderController,
  getAllOrderController,
} from './order.controller';

export const OrderRoutes = Router();

OrderRoutes.route('/request')
  .post(createOrderController)
  .get(getAllOrderController);

OrderRoutes.route('/approve').get(approvalScriptionController);
