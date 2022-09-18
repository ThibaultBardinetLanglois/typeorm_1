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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
const index_1 = __importDefault(require("../index"));
class Database {
}
exports.Database = Database;
_a = Database;
Database.openConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new typeorm_1.DataSource({
            type: "mysql",
            port: Number(index_1.default.database.port),
            username: index_1.default.database.user,
            password: index_1.default.database.password,
            database: index_1.default.database.name,
            logging: true,
            entities: [],
            subscribers: [],
            migrations: [],
        });
        console.log(`Database ${index_1.default.database.name} is connected and is running on port ${index_1.default.database.port}`);
    }
    catch (error) {
        console.error('Unable to connect to the database');
        throw new Error("Unable to connect to database");
    }
});
//# sourceMappingURL=config.js.map