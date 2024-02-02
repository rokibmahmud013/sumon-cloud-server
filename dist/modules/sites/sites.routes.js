"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesRoutes = void 0;
const express_1 = require("express");
const sites_controller_1 = require("./sites.controller");
exports.sitesRoutes = (0, express_1.Router)();
exports.sitesRoutes.route('/').get(sites_controller_1.getAllSitesController).post(sites_controller_1.createSitesController);
exports.sitesRoutes.route('/:id').delete(sites_controller_1.deleteSitesController);
