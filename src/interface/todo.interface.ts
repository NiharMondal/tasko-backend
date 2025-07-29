import { Types } from "mongoose";

export interface ITodo {
	category: string;
	status: string;
	description: string;
	endDate: string;
	user: Types.ObjectId;
}
