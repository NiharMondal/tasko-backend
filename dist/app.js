"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFoundRoute_1 = __importDefault(require("./lib/notFoundRoute"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "https://tasko-frontend-seven.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
}));
app.use("/api/v1", routes_1.default);
//not found route handler
app.use(notFoundRoute_1.default);
//global error controller/ handler
app.use(globalErrorHandler_1.default);
exports.default = app;
