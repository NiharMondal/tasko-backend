import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { userValidation } from "../validation/user.validation";
import { authGuard } from "../middlewares/authGuard";
import { UserRole } from "../const";

const router = Router();

router.post(
	"/register",
	validateRequest(userValidation.register),
	userController.registerUser
);
router.post(
	"/login",
	validateRequest(userValidation.login),
	userController.loginUser
);

router.post(
	"/change-password",
	authGuard(UserRole.ADMIN, UserRole.USER),
	validateRequest(userValidation.changePassword),
	userController.changePassword
);

router.post(
	"/forgot-password",
	validateRequest(userValidation.forgotPassword),
	userController.forgotPassword
);
router.post(
	"/reset-password",
	validateRequest(userValidation.register),
	userController.resetPassword
);
export const userRouter = router;
