"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
exports.OrderRoutes = (0, express_1.Router)();
exports.OrderRoutes.route('/request')
    .post(order_controller_1.createOrderController)
    .get(order_controller_1.getAllOrderController);
exports.OrderRoutes.route('/approve').get(order_controller_1.approvalScriptionController);
