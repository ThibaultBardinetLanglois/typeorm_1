"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_routes_1 = __importDefault(require("../api/routes/api.routes"));
const logger_middleware_1 = __importDefault(require("../middlewares/console/logger.middleware"));
const morgan_middleware_1 = __importDefault(require("../middlewares/console/morgan.middleware"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger_middleware_1.default);
app.use(morgan_middleware_1.default);
app.use(express_1.default.json());
app.use('/api', api_routes_1.default);
exports.default = app;
//# sourceMappingURL=express.js.map