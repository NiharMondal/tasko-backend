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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const asyncHandler_1 = __importDefault(require("../lib/asyncHandler"));
const user_services_1 = require("../services/user.services");
const sendResponse_1 = __importDefault(require("../lib/sendResponse"));
const registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_services_1.userServices.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        message: "User registered successfully",
        statusCode: 201,
        result: data,
    });
}));
const loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_services_1.userServices.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        message: "User logged in successfully",
        statusCode: 200,
        result: data,
    });
}));
const changePassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = yield user_services_1.userServices.changePassword(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Password changed successfully",
        statusCode: 200,
        result: data,
    });
}));
const forgotPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_services_1.userServices.forgotPassword(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Send a new link",
        statusCode: 200,
        result: data,
    });
}));
const resetPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const data = yield user_services_1.userServices.resetPassword(token, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Password reset successfully",
        statusCode: 200,
        result: data,
    });
}));
exports.userController = {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
