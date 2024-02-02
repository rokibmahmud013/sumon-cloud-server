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
exports.getAllSitesController = exports.deleteSitesController = exports.createSitesController = void 0;
const sites_service_1 = require("./sites.service");
const createSitesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, sites_service_1.createSitesService)(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'successfully created Notice',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createSitesController = createSitesController;
const deleteSitesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield (0, sites_service_1.deleteSitesService)(id);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'successfully Deleted Notice',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSitesController = deleteSitesController;
const getAllSitesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        const { category, sites } = req.query;
        query.sites = sites;
        query.category = category;
        const data = yield (0, sites_service_1.getAllSitesService)(query);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'successfull',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSitesController = getAllSitesController;
