import { NextFunction, Request, Response } from 'express';
import {
  createSitesService,
  deleteSitesService,
  getAllSitesService,
} from './sites.service';

export const createSitesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createSitesService(req.body);

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

export const deleteSitesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const data = await deleteSitesService(id);

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

export const getAllSitesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query: any = {};
    const { category, sites } = req.query;
    query.sites = sites;
    query.category = category;

    const data = await getAllSitesService(query);

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
