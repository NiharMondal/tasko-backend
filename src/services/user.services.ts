import { envConfig } from "../config";
import { IAuthToken } from "../interface/common.interface";
import { IUser } from "../interface/user.interface";
import CustomError from "../lib/CustomError";
import { User } from "../models/user.model";
import { comparePassword, makeHashPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

type TChangePassword = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

const registerUser = async (payload: IUser) => {
	const user = await User.findOne({ email: payload.email });

	if (user) {
		throw new CustomError(302, "Email is already taken");
	}

	const newUser = await User.create(payload);

	return {
		_id: newUser._id,
		fullname: newUser.fullName,
		email: newUser.email,
		role: newUser.role,
		isDeleted: newUser.isDeleted,
	};
};

const loginUser = async (payload: Pick<IUser, "email" | "password">) => {
	const user = await User.findOne({ email: payload.email });

	if (!user) {
		throw new CustomError(404, "Invalid credentials");
	}

	const isValidPass = await comparePassword(payload.password, user.password);

	if (!isValidPass) {
		throw new CustomError(404, "Invalid credentials");
	}

	const tokenPayload = {
		id: user._id,
		name: user.fullName,
		email: user.email,
		role: user.role,
	};

	const token = jwt.sign(
		tokenPayload,
		envConfig.access_token_secret as string,
		{ expiresIn: "30d" }
	);
	return {
		accessToken: token,
	};
};

const changePassword = async (id: string, payload: TChangePassword) => {
	const user = await User.findById(id);

	if (!user) {
		throw new CustomError(404, "User not found");
	}

	if (payload.oldPassword === payload.newPassword) {
		throw new CustomError(400, "New password can not be previous password");
	}

	if (payload.newPassword !== payload.confirmPassword) {
		throw new CustomError(400, "Password does not match");
	}

	const matchPassword = await comparePassword(
		payload.oldPassword,
		user.password
	);

	if (!matchPassword) {
		throw new CustomError(400, "Invalid credentials");
	}

	const isSame = await comparePassword(payload.newPassword, user.password);

	if (isSame) {
		throw new CustomError(
			400,
			"New password must be different from current password"
		);
	}

	const hashed = await makeHashPassword(payload.newPassword);

	await User.findByIdAndUpdate(
		id,
		{
			$set: {
				password: hashed,
			},
		},
		{ new: true, runValidators: true }
	);
};

const forgotPassword = async (payload: Pick<IUser, "email">) => {
	const user = await User.findOne({ email: payload.email });
	if (!user) {
		throw new CustomError(404, "User does not exist");
	}

	const tokenPayload = {
		id: user._id,
		email: user.email,
		role: user.role,
	};
	const token = jwt.sign(
		tokenPayload,
		envConfig.access_token_secret as string,
		{
			expiresIn: "10m",
		}
	);

	const resetUiLink = `${envConfig.client_url}/reset-password?token=${token}`;

	try {
		const link = await sendEmail({ to: user.email, link: resetUiLink });
		return link;
	} catch (error) {
		console.log(error);
	}
};

const resetPassword = async (
	token: string,
	payload: Pick<IUser, "password">
) => {
	if (!token) {
		throw new CustomError(400, "Token not found!");
	}

	const decodeToken = jwt.verify(
		token,
		envConfig.access_token_secret as string
	) as IAuthToken;

	const { id } = decodeToken;
	const user = await User.findById(id);

	if (!user) {
		throw new CustomError(404, "Invalid token or user");
	}

	const hashPassword = makeHashPassword(payload.password);

	await User.findByIdAndUpdate(
		id,
		{ $set: { password: hashPassword } },
		{ new: true }
	);
};
export const userServices = {
	registerUser,
	loginUser,
	forgotPassword,
	changePassword,
	resetPassword,
};
