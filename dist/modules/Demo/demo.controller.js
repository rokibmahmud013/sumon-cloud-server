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
exports.createDemoController = void 0;
const demo_validation_1 = require("./demo.validation");
const createDemoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating a schema validation using Zod
        const data = demo_validation_1.DemoValidationSchema.parse(req.body);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'successfully created demo',
            data: data,
        });
    }
    catch (error) {
        res.status(error.status).json({
            status: error.status,
            success: false,
            message: error.message,
        });
    }
});
exports.createDemoController = createDemoController;
