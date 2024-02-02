"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./errors");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.use(express_1.default.json());
app.use(middleware_1.default);
app.use('/api', routes_1.default);
app.use(errors_1.notFoundHandler);
app.use(errors_1.errorHandler);
exports.default = app;
