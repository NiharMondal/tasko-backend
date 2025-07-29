"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeArray_1 = require("./routeArray");
const rootRouter = (0, express_1.Router)();
routeArray_1.routeArray.forEach((route) => rootRouter.use(route.path, route.router));
exports.default = rootRouter;
