"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../middlewares/validateRequest");
const authGuard_1 = require("../middlewares/authGuard");
const const_1 = require("../const");
const todo_validation_1 = require("../validation/todo.validation");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
router.get("/my-todos", (0, authGuard_1.authGuard)(const_1.UserRole.ADMIN, const_1.UserRole.USER), todo_controller_1.todoController.getMyTodos);
router
    .route("/:id")
    .get(todo_controller_1.todoController.getSingeDoc)
    .patch((0, authGuard_1.authGuard)(const_1.UserRole.ADMIN, const_1.UserRole.USER), todo_controller_1.todoController.updateDoc)
    .delete((0, authGuard_1.authGuard)(const_1.UserRole.ADMIN, const_1.UserRole.USER), todo_controller_1.todoController.deleteDoc);
router
    .route("/")
    .post((0, authGuard_1.authGuard)(const_1.UserRole.ADMIN, const_1.UserRole.USER), (0, validateRequest_1.validateRequest)(todo_validation_1.todoValidation.createTodo), todo_controller_1.todoController.insertIntoDB)
    .get((0, authGuard_1.authGuard)(const_1.UserRole.ADMIN), todo_controller_1.todoController.getAllFromDB);
exports.todoRouter = router;
