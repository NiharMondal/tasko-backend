"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["ongoing", "pending", "collaborative", "done"],
        default: "pending",
        required: [true, "Status is required"],
    },
    endDate: {
        type: String,
        required: [true, "End date is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
}, { timestamps: true });
exports.Todo = (0, mongoose_1.model)("Todo", todoSchema);
