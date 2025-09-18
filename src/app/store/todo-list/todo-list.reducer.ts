import { createReducer, on } from '@ngrx/store';
import { TodoItem } from '../../models/todo.interface';
import {
  createTodoSuccess,
  deleteTodoSuccess,
  getTodosSuccess,
  updateTodoSuccess,
} from './todo-list.action';

const INITIAL_STATE: TodoItem[] = [];

export const TodoListReducer = createReducer(
  INITIAL_STATE,
  on(getTodosSuccess, (state, action) => [...action.todoList]),
  on(createTodoSuccess, (state, action) => [...state, action.createdTodo]),
  on(deleteTodoSuccess, (state, action) => [
    ...state.filter((item) => item._id !== action.id),
  ]),
  on(updateTodoSuccess, (state, action) => [
    ...state.map((item) =>
      item._id === action.updatedTodo._id ? action.updatedTodo : item
    ),
  ])
);
