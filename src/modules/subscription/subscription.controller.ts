import { NextFunction, Request, Response } from 'express';
import {
  createSubscriptionService,
  getAllSubscriptionByIdService,
  getAllSubscriptionService,
} from './subscription.service';

export const getSubscriptionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await getAllSubscriptionByIdService(id);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'success',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllSubscriptionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status } = req.query;
  try {
    const data = await getAllSubscriptionService(status);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'success',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
export const createSubscriptionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createSubscriptionService(req.body);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'subscription updated successfully',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
