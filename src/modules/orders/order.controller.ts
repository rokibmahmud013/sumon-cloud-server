import { NextFunction, Request, Response } from 'express';
import {
  approvalOrderService,
  createOrderService,
  getAllOrderService,
} from './order.service';

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createOrderService(req.body);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Its Being Under Admin Review admin Will approve 1 to 12 hours',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const approvalScriptionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queries: any = {};
    const { id, user } = req.query;

    queries.id = id;
    queries.user = user;
    const data = await approvalOrderService(queries);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Approved Successfully!',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllOrderService();

    res.status(200).json({
      status: 200,
      success: true,
      message: 'successfull',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
