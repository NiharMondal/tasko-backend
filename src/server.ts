import app from "./app";
import mongoose from "mongoose";
import { envConfig } from "./config";

async function main() {
	try {
		await mongoose.connect(envConfig.mongo_uri as string);

		app.listen(envConfig.port, () => {
			console.log(
				`✅ App is listening on port ${envConfig.port}\n✅ MongoDB connected successfully\n`
			);
		});
	} catch (err) {
		console.log(err);
	}
}

main();
