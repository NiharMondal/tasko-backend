import { TQuery } from "../interface/common.interface";
import { ITodo } from "../interface/todo.interface";
import QueryBuilder from "../lib/QueryBuilder";
import { Todo } from "../models/todo.model";

const insertIntoDB = async (id: string, payload: ITodo) => {
	const todo = await Todo.create({ ...payload, user: id });

	return todo;
};

const getAllFromDB = async (query: TQuery) => {
	const qb = new QueryBuilder(Todo.find(), query)
		.search(["category", "description", "status"])
		.filter()
		.pagination()
		.sort();

	const todos = await qb.getQuery();
	const meta = await qb.countTotal();

	return { todos, meta };
};
const getMyTodos = async (userId: string, query: TQuery) => {
	const qb = new QueryBuilder(Todo.find({ user: userId }), query)
		.search(["category", "description", "status"])
		.filter()
		.pagination()
		.sort();

	const todos = await qb.getQuery();
	const meta = await qb.countTotal();

	return { todos, meta };
};

export const todoServices = { insertIntoDB, getAllFromDB, getMyTodos };
