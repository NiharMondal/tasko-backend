import { IAuthToken } from "./interface/common.interface";

declare global {
	namespace Express {
		interface Request {
			user: IAuthToken;
		}
	}
}
