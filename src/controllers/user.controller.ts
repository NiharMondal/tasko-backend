import { Request, Response } from "express";
import asyncHandler from "../lib/asyncHandler";
import { userServices } from "../services/user.services";
import sendResponse from "../lib/sendResponse";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const data = await userServices.registerUser(req.body);

	sendResponse(res, {
		message: "User registered successfully",
		statusCode: 201,
		result: data,
	});
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
	const data = await userServices.loginUser(req.body);

	sendResponse(res, {
		message: "User logged in successfully",
		statusCode: 200,
		result: data,
	});
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.user;
	const data = await userServices.changePassword(id, req.body);

	sendResponse(res, {
		message: "Password changed successfully",
		statusCode: 200,
		result: data,
	});
});
const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
	const data = await userServices.forgotPassword(req.body);

	sendResponse(res, {
		message: "Send a new link",
		statusCode: 200,
		result: data,
	});
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
	const token = req.query.token;
	const data = await userServices.resetPassword(token as string, req.body);

	sendResponse(res, {
		message: "Password reset successfully",
		statusCode: 200,
		result: data,
	});
});

export const userController = {
	registerUser,
	loginUser,
	changePassword,
	forgotPassword,
	resetPassword,
};
