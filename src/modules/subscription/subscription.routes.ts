import { Router } from 'express';
import { createSubscriptionController, getAllSubscriptionController, getSubscriptionByIdController } from './subscription.controller';


export const subScriptionRoutes = Router();

subScriptionRoutes.route('/')
.post(createSubscriptionController)
  .get(getAllSubscriptionController)
subScriptionRoutes.route('/:id')
  .get(getSubscriptionByIdController)



