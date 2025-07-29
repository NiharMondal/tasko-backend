"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.envConfig = {
    port: 5000,
    salt_round: 10,
    node_env: process.env.NODE_ENV,
    mongo_uri: process.env.MONGO_URI,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    client_url: process.env.FRONT_END_URL,
    emailUtils: {
        email: process.env.NODEMAILER_EMAIL,
        password: process.env.NODEMAILER_PASSWORD,
    },
};
