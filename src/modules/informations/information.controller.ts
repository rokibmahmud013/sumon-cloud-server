import { NextFunction, Request, Response } from 'express';
import {
  createInfoService,
  getAllInfoService,
  updateInfoService,
} from './information.services';

export const createInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const browserInfo = (req as any).agent || {};

  try {
    const originalData = { ...req.body, agent: browserInfo };
    const data = await createInfoService(originalData);
    res.status(201).json({
      status: 201,
      success: true,
      message: 'success',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let query: any = {};
    const id: any = req.query.id;

    if (id) {
      query = { user: id };
    }
    const data = await getAllInfoService(query);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'successfully created demo',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const originalData = { ...req.body, agent: (req as any).agent };
    const data = await updateInfoService(id, originalData);
    res.status(201).json({
      status: 201,
      success: true,
      message: 'success',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
