import { model, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import { makeHashPassword } from "../utils/password";
import { UserRole } from "../const";

const userSchema = new Schema<IUser>({
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
		enum: UserRole,
		default: "user",
	},

	isDeleted: {
		type: Boolean,
		default: false,
	},
});

userSchema.pre("save", async function (next) {
	const hashedPassword = await makeHashPassword(this.password);

	this.password = hashedPassword;

	next();
});

export const User = model<IUser>("User", userSchema);
