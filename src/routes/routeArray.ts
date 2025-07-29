import { todoRouter } from "./todo.routes";
import { userRouter } from "./user.routes";

export const routeArray = [
	{ path: "/users", router: userRouter },
	{ path: "/todos", router: todoRouter },
];
