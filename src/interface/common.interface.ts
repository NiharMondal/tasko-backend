export interface IAuthToken {
	id: string;
	email: string;
	role: string;
	exp: number;
}

export type TQuery = Record<string, string | string[] | undefined>;
