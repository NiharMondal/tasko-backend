import express, { Application } from "express";
import cors from "cors";

import notFoundRoute from "./lib/notFoundRoute";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import rootRouter from "./routes";

const app: Application = express();

app.use(express.json());

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);

app.use("/api/v1", rootRouter);

//not found route handler
app.use(notFoundRoute);

//global error controller/ handler
app.use(globalErrorHandler);

export default app;
