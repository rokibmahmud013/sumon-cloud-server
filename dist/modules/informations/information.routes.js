"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoRoutes = void 0;
const express_1 = require("express");
const information_controller_1 = require("./information.controller");
const agent_1 = require("../../middlewares/agent");
exports.infoRoutes = (0, express_1.Router)();
exports.infoRoutes
    .route('/')
    .get(agent_1.agentMiddleware, information_controller_1.getAllInfoController)
    .post(agent_1.agentMiddleware, information_controller_1.createInfoController);
exports.infoRoutes.route('/:id').patch(information_controller_1.updateInfoController);
