import { IShortener } from './shortener.interface';
import { NextFunction, Request, Response } from 'express';
import {
  createShortLinkService,
  getAllShortLinkService,
} from './shortener.service';

export const createShortLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createShortLinkService(req.body as IShortener);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'successfully created ShortLinks',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllShortLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getAllShortLinkService();

    res.status(201).json({
      status: 200,
      success: true,
      message: 'Url Converted Successsfully',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
