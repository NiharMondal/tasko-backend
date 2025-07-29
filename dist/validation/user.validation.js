"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const register = zod_1.default.object({
    fullName: zod_1.default
        .string("Username is required")
        .min(3, "Min length is 3")
        .max(40, "Max length is 20")
        .trim(),
    email: zod_1.default.string("Email is required").trim(),
    password: zod_1.default
        .string("Password is required")
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
});
const login = zod_1.default.object({
    email: zod_1.default.string({ error: "Email is required" }).trim(),
    password: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
});
const forgotPassword = zod_1.default.object({
    email: zod_1.default.string({ error: "Email is required" }).trim(),
});
const changePassword = zod_1.default.object({
    oldPassword: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
    newPassword: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
    confirmPassword: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
});
const resetPassword = zod_1.default
    .object({
    newPassword: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
    confirmPassword: zod_1.default
        .string({ error: "Password is required" })
        .min(6, "Min length is 6")
        .max(30, "Max length is 30")
        .trim(),
})
    .refine((data) => data.newPassword !== data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.userValidation = {
    register,
    login,
    forgotPassword,
    changePassword,
    resetPassword,
};
