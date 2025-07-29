import z from "zod";

const createTodo = z.object({
	category: z.string("Category is required").trim(),
	status: z.enum(["ongoing", "pending", "collaborative", "done"]).optional(),
	endDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
		.refine((val) => {
			const date = new Date(val);
			return !isNaN(date.getTime());
		}, "Invalid date")
		.refine((val) => {
			const now = new Date();
			const inputDate = new Date(val);
			inputDate.setHours(0, 0, 0, 0);
			now.setHours(0, 0, 0, 0);
			return inputDate >= now;
		}, "You can not set a past date"),
	description: z
		.string()
		.min(10, "Min length is 10")
		.max(100, "Max length is 100"),
});

export const todoValidation = { createTodo };
