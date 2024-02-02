import { NextFunction, Request, Response } from 'express';
import {
  createNoticeService,
  getAllNoticeService,
  deleteNoticeService,
} from './notice.service';

export const createNoticeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createNoticeService(req.body);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'successfully created Notice',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNoticeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await deleteNoticeService(id);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'successfully Deleted Notice',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNoticeController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllNoticeService();

    res.status(200).json({
      status: 201,
      success: true,
      message: 'successfull',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
