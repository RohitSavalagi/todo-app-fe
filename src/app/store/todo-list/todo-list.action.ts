import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../../models/todo.interface';

export const getTodos = createAction('[Todo Component] Get All Todos');
export const getTodosSuccess = createAction(
  '[TODO Component] Get All Todos Success',
  props<{ todoList: TodoItem[] }>()
);

export const createTodo = createAction(
  '[Todo Component] Insert a Todo',
  props<{
    todo: {
      title: string;
      completed: boolean;
    };
  }>()
);

export const updateTodo = createAction(
  '[Todo Component] Update a Todo',
  props<{ todo: TodoItem }>()
);

export const deleteTodo = createAction(
  '[Todo Component] Delete a Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
  '[TODO Component] Delete Todo Success',
  props<{ id: string }>()
);

export const createTodoSuccess = createAction(
  '[Todo Component] Created a Todo Successfully',
  props<{ createdTodo: TodoItem }>()
);

export const updateTodoSuccess = createAction(
  '[Todo Component] Updated a Todo Successfully',
  props<{ updatedTodo: TodoItem }>()
);
