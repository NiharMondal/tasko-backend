import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { authGuard } from "../middlewares/authGuard";
import { UserRole } from "../const";
import { todoValidation } from "../validation/todo.validation";
import { todoController } from "../controllers/todo.controller";

const router = Router();

router.get(
	"/my-todos",
	authGuard(UserRole.ADMIN, UserRole.USER),
	todoController.getMyTodos
);
router
	.route("/:id")
	.get(todoController.getSingeDoc)
	.patch(authGuard(UserRole.ADMIN, UserRole.USER), todoController.updateDoc)
	.delete(authGuard(UserRole.ADMIN, UserRole.USER), todoController.deleteDoc);
router
	.route("/")
	.post(
		authGuard(UserRole.ADMIN, UserRole.USER),
		validateRequest(todoValidation.createTodo),
		todoController.insertIntoDB
	)
	.get(authGuard(UserRole.ADMIN), todoController.getAllFromDB);

export const todoRouter = router;
