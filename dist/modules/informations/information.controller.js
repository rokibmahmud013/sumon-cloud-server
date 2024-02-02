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
exports.updateInfoController = exports.getAllInfoController = exports.createInfoController = void 0;
const information_services_1 = require("./information.services");
const createInfoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const browserInfo = req.agent || {};
    try {
        const originalData = Object.assign(Object.assign({}, req.body), { agent: browserInfo });
        const data = yield (0, information_services_1.createInfoService)(originalData);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'success',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createInfoController = createInfoController;
const getAllInfoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        const id = req.query.id;
        if (id) {
            query = { user: id };
        }
        const data = yield (0, information_services_1.getAllInfoService)(query);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'successfully created demo',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllInfoController = getAllInfoController;
const updateInfoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const originalData = Object.assign(Object.assign({}, req.body), { agent: req.agent });
        const data = yield (0, information_services_1.updateInfoService)(id, originalData);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'success',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateInfoController = updateInfoController;
