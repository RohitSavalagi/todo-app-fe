import { createReducer, on } from "@ngrx/store";
import { TodoItem } from "../../models/todo.interface";
import { createTodoSuccess, deleteTodo, deleteTodoSuccess, getTodosSuccess, updateTodoSuccess } from "./todo-list.action";
import { Actions } from "@ngrx/effects";

const INITIAL_STATE: TodoItem[] = [];

export const TodoListReducer = createReducer(
  INITIAL_STATE,
  on(deleteTodoSuccess, (state, action) => ([
    ...action.todoList
  ])),
  on(getTodosSuccess, (state, action) => ([
    ...action.todoList,
  ])),
  on(createTodoSuccess, (state, action) => [
    ...action.todoList,
  ]),
  on(updateTodoSuccess, (state, action) => [
    ...action.todoList,
  ])
);
