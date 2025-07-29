import bcrypt from "bcrypt";
import { envConfig } from "../config";

//make password hash to store in DB
export const makeHashPassword = async (password: string) => {
	const result = await bcrypt.hash(password, envConfig.salt_round);
	return result;
};

//comparing password with new password
/**
 *
 * @param newPass
 * @param oldPass
 * @returns boolean
 */
export const comparePassword = async (
	newPass: string,
	oldPass: string
): Promise<Boolean> => {
	const result = await bcrypt.compare(newPass, oldPass);

	return result;
};
