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
exports.getAllOrderController = exports.approvalScriptionController = exports.createOrderController = void 0;
const order_service_1 = require("./order.service");
const createOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, order_service_1.createOrderService)(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Its Being Under Admin Review admin Will approve 1 to 12 hours',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderController = createOrderController;
const approvalScriptionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = {};
        const { id, user } = req.query;
        queries.id = id;
        queries.user = user;
        const data = yield (0, order_service_1.approvalOrderService)(queries);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Approved Successfully!',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.approvalScriptionController = approvalScriptionController;
const getAllOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, order_service_1.getAllOrderService)();
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
exports.getAllOrderController = getAllOrderController;
