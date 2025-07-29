export const PAGE_LIMIT = 10;
export const UserRole = {
	ADMIN: "admin",
	USER: "user",
} as const;

export type TUserRole = (typeof UserRole)[keyof typeof UserRole];
