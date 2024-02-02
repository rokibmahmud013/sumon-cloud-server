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
exports.getAllShortLinkController = exports.createShortLinkController = void 0;
const shortener_service_1 = require("./shortener.service");
const createShortLinkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, shortener_service_1.createShortLinkService)(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'successfully created ShortLinks',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createShortLinkController = createShortLinkController;
const getAllShortLinkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, shortener_service_1.getAllShortLinkService)();
        res.status(201).json({
            status: 200,
            success: true,
            message: 'Url Converted Successsfully',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllShortLinkController = getAllShortLinkController;
