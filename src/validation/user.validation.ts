import z from "zod";

const register = z.object({
	fullName: z
		.string("Username is required")
		.min(3, "Min length is 3")
		.max(40, "Max length is 20")
		.trim(),
	email: z.string("Email is required").trim(),
	password: z
		.string()
		.nonempty("Password can not be empty")
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.regex(/[a-zA-Z]/, "Password must contain at least one letter")
		.regex(/\d/, "Password must contain at least one number")
		.regex(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must contain at least one special character"
		)
		.trim(),
});

const login = z.object({
	email: z.string({ error: "Email is required" }).trim(),
	password: z
		.string({ error: "Password is required" })
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.trim(),

	rememberMe: z.boolean().optional(),
});
const forgotPassword = z.object({
	email: z.string({ error: "Email is required" }).trim(),
});

const changePassword = z.object({
	oldPassword: z
		.string({ error: "Password is required" })
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.trim(),
	newPassword: z
		.string({ error: "Password is required" })
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.trim(),
	confirmPassword: z
		.string({ error: "Password is required" })
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.trim(),
});

const resetPassword = z
	.object({
		newPassword: z
			.string({ error: "Password is required" })
			.min(6, "Min length is 6")
			.max(30, "Max length is 30")
			.trim(),
		confirmPassword: z
			.string({ error: "Password is required" })
			.min(6, "Min length is 6")
			.max(30, "Max length is 30")
			.trim(),
	})
	.refine((data) => data.newPassword !== data.newPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const userValidation = {
	register,
	login,
	forgotPassword,
	changePassword,
	resetPassword,
};
