"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeArray = void 0;
const todo_routes_1 = require("./todo.routes");
const user_routes_1 = require("./user.routes");
exports.routeArray = [
    { path: "/users", router: user_routes_1.userRouter },
    { path: "/todos", router: todo_routes_1.todoRouter },
];
