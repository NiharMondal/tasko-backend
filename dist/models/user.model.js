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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const password_1 = require("../utils/password");
const const_1 = require("../const");
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    role: {
        type: String,
        enum: const_1.UserRole,
        default: "user",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, password_1.makeHashPassword)(this.password);
        this.password = hashedPassword;
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
