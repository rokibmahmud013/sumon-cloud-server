import { Router } from 'express';
import {
  createNoticeController,
  deleteNoticeController,
  getAllNoticeController,
} from './notice.controller';

export const noticeRoutes = Router();

noticeRoutes
  .route('/')
  .get(getAllNoticeController)
  .post(createNoticeController);

noticeRoutes.route('/:id').delete(deleteNoticeController);
