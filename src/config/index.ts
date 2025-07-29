import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
	port: 5000,
	salt_round: 10,
	node_env: process.env.NODE_ENV,
	mongo_uri: process.env.MONGO_URI,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	client_url: process.env.FRONT_END_URL,
	emailUtils: {
		email: process.env.NODEMAILER_EMAIL,
		password: process.env.NODEMAILER_PASSWORD,
	},
};
