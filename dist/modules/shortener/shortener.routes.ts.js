"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortRoutes = void 0;
const express_1 = require("express");
const shortener_controller_1 = require("./shortener.controller");
exports.shortRoutes = (0, express_1.Router)();
exports.shortRoutes
    .route('/')
    .get(shortener_controller_1.getAllShortLinkController)
    .post(shortener_controller_1.createShortLinkController);
