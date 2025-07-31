import { Request, Response } from "express";
import asyncHandler from "../lib/asyncHandler";
import sendResponse from "../lib/sendResponse";
import { todoServices } from "../services/todo.services";
import { TQuery } from "../interface/common.interface";

const insertIntoDB = asyncHandler(async (req: Request, res: Response) => {
	const user = req.user;
	const data = await todoServices.insertIntoDB(user?.id, req.body);

	sendResponse(res, {
		message: "Todo created successfully",
		statusCode: 201,
		result: data,
	});
});

const getAllFromDB = asyncHandler(async (req: Request, res: Response) => {
	const data = await todoServices.getAllFromDB(req.query as TQuery);

	sendResponse(res, {
		message: "All todos fetched successfully",
		statusCode: 200,
		meta: data.meta,
		result: data.todos,
	});
});

const getMyTodos = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.user;
	const data = await todoServices.getMyTodos(id, req.query as TQuery);

	sendResponse(res, {
		message: "My Todo fetched successfully",
		statusCode: 200,
		meta: data.meta,
		result: data.todos,
	});
});
const getSingeDoc = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = await todoServices.getSingeDoc(id);

	sendResponse(res, {
		message: "Todo fetched successfully",
		statusCode: 200,

		result: data,
	});
});
const updateDoc = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = await todoServices.updateDoc(id, req.body);

	sendResponse(res, {
		message: "Todo updated successfully",
		statusCode: 200,
		result: data,
	});
});
const deleteDoc = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = await todoServices.deleteDoc(id);

	sendResponse(res, {
		message: "Todo deleted successfully",
		statusCode: 200,
		result: data,
	});
});

export const todoController = {
	insertIntoDB,
	getAllFromDB,
	getMyTodos,
	getSingeDoc,
	updateDoc,
	deleteDoc,
};
