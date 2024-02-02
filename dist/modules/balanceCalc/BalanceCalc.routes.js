"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRoutes = void 0;
const express_1 = require("express");
const BalanceCalc_controller_1 = require("./BalanceCalc.controller");
exports.balanceRoutes = (0, express_1.Router)();
exports.balanceRoutes
    .route('/')
    .get(BalanceCalc_controller_1.getAdminBalanceController);
