import { Request, Response, Router } from 'express';
import { noticeRoutes } from '../modules/notice/notice.routes';
import { shortRoutes } from '../modules/shortener/shortener.routes.ts';
import { authRoutes } from '../modules/user/user.routes';
import { sitesRoutes } from '../modules/sites/sites.routes';
import { infoRoutes } from '../modules/informations/information.routes';
import { OrderRoutes } from '../modules/orders/order.routes';
import { subScriptionRoutes } from '../modules/subscription/subscription.routes';
const routes = Router();

routes.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: 'success',
    data: (req as any).agent,
  });
});

// all Routes
routes.use('/auth', authRoutes);
routes.use('/notices', noticeRoutes);
routes.use('/shortlinks', shortRoutes);
routes.use('/sites', sitesRoutes);
routes.use('/information', infoRoutes);
routes.use('/orders', OrderRoutes);
routes.use('/subscription', subScriptionRoutes);

export default routes;
