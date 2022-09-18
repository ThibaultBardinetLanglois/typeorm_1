"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/.env' });
exports.default = {
    server_port: process.env.SERVER_PORT,
    secret: process.env.SERVER_SECRET,
    database: {
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host_dev: process.env.DB_HOOST_DEV,
    },
};
//# sourceMappingURL=index.js.map