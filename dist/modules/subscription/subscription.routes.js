"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subScriptionRoutes = void 0;
const express_1 = require("express");
const subscription_controller_1 = require("./subscription.controller");
exports.subScriptionRoutes = (0, express_1.Router)();
exports.subScriptionRoutes
    .route('/')
    .post(subscription_controller_1.createSubscriptionController)
    .get(subscription_controller_1.getAllSubscriptionController);
exports.subScriptionRoutes.route('/:id').get(subscription_controller_1.getSubscriptionByIdController);
