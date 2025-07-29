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
exports.userServices = void 0;
const config_1 = require("../config");
const CustomError_1 = __importDefault(require("../lib/CustomError"));
const user_model_1 = require("../models/user.model");
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../utils/sendEmail");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new CustomError_1.default(302, "Email is already taken");
    }
    const newUser = yield user_model_1.User.create(payload);
    return {
        _id: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        isDeleted: newUser.isDeleted,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new CustomError_1.default(404, "Invalid credentials");
    }
    const isValidPass = yield (0, password_1.comparePassword)(payload.password, user.password);
    if (!isValidPass) {
        throw new CustomError_1.default(404, "Invalid credentials");
    }
    const tokenPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, config_1.envConfig.access_token_secret, { expiresIn: "30d" });
    return {
        accessToken: token,
    };
});
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new CustomError_1.default(404, "User not found");
    }
    if (payload.oldPassword === payload.newPassword) {
        throw new CustomError_1.default(400, "New password can not be previous password");
    }
    if (payload.newPassword !== payload.confirmPassword) {
        throw new CustomError_1.default(400, "Password does not match");
    }
    const matchPassword = yield (0, password_1.comparePassword)(payload.oldPassword, user.password);
    if (!matchPassword) {
        throw new CustomError_1.default(400, "Invalid credentials");
    }
    const isSame = yield (0, password_1.comparePassword)(payload.newPassword, user.password);
    if (isSame) {
        throw new CustomError_1.default(400, "New password must be different from current password");
    }
    const hashed = yield (0, password_1.makeHashPassword)(payload.newPassword);
    yield user_model_1.User.findByIdAndUpdate(id, {
        $set: {
            password: hashed,
        },
    }, { new: true, runValidators: true });
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new CustomError_1.default(404, "User does not exist");
    }
    const tokenPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, config_1.envConfig.access_token_secret, {
        expiresIn: "10m",
    });
    const resetUiLink = `${config_1.envConfig.client_url}/reset-password?token=${token}`;
    try {
        const link = yield (0, sendEmail_1.sendEmail)({ to: user.email, link: resetUiLink });
        return link;
    }
    catch (error) {
        console.log(error);
    }
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new CustomError_1.default(400, "Token not found!");
    }
    const decodeToken = jsonwebtoken_1.default.verify(token, config_1.envConfig.access_token_secret);
    const { id } = decodeToken;
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new CustomError_1.default(404, "Invalid token or user");
    }
    const hashPassword = (0, password_1.makeHashPassword)(payload.password);
    yield user_model_1.User.findByIdAndUpdate(id, { $set: { password: hashPassword } }, { new: true });
});
exports.userServices = {
    registerUser,
    loginUser,
    forgotPassword,
    changePassword,
    resetPassword,
};
