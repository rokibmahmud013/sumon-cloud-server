"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notice_routes_1 = require("../modules/notice/notice.routes");
const shortener_routes_ts_1 = require("../modules/shortener/shortener.routes.ts");
const user_routes_1 = require("../modules/user/user.routes");
const sites_routes_1 = require("../modules/sites/sites.routes");
const information_routes_1 = require("../modules/informations/information.routes");
const order_routes_1 = require("../modules/orders/order.routes");
const subscription_routes_1 = require("../modules/subscription/subscription.routes");
const routes = (0, express_1.Router)();
routes.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 200,
        message: 'success',
        data: req.agent,
    });
}));
// all Routes
routes.use('/auth', user_routes_1.authRoutes);
routes.use('/notices', notice_routes_1.noticeRoutes);
routes.use('/shortlinks', shortener_routes_ts_1.shortRoutes);
routes.use('/sites', sites_routes_1.sitesRoutes);
routes.use('/information', information_routes_1.infoRoutes);
routes.use('/orders', order_routes_1.OrderRoutes);
routes.use('/subscription', subscription_routes_1.subScriptionRoutes);
exports.default = routes;
