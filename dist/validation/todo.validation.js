"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createTodo = zod_1.default.object({
    category: zod_1.default.string("Category is required").trim(),
    status: zod_1.default.enum(["ongoing", "pending", "collaborative", "done"]).optional(),
    endDate: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
        .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, "Invalid date")
        .refine((val) => {
        const now = new Date();
        const inputDate = new Date(val);
        inputDate.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return inputDate >= now;
    }, "You can not set a past date"),
    description: zod_1.default
        .string()
        .min(10, "Min length is 10")
        .max(100, "Max length is 100"),
});
exports.todoValidation = { createTodo };
