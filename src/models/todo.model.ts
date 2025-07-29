import { model, Schema } from "mongoose";
import { ITodo } from "../interface/todo.interface";

const todoSchema = new Schema<ITodo>(
	{
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
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
		},
	},
	{ timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
