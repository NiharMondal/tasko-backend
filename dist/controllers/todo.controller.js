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
exports.todoController = void 0;
const asyncHandler_1 = __importDefault(require("../lib/asyncHandler"));
const sendResponse_1 = __importDefault(require("../lib/sendResponse"));
const todo_services_1 = require("../services/todo.services");
const insertIntoDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = yield todo_services_1.todoServices.insertIntoDB(user === null || user === void 0 ? void 0 : user.id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Todo created successfully",
        statusCode: 201,
        result: data,
    });
}));
const getAllFromDB = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield todo_services_1.todoServices.getAllFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        message: "All todos fetched successfully",
        statusCode: 200,
        meta: data.meta,
        result: data.todos,
    });
}));
const getMyTodos = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = yield todo_services_1.todoServices.getMyTodos(id, req.query);
    (0, sendResponse_1.default)(res, {
        message: "My Todo fetched successfully",
        statusCode: 200,
        meta: data.meta,
        result: data.todos,
    });
}));
exports.todoController = { insertIntoDB, getAllFromDB, getMyTodos };
