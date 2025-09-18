import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createTodo,
  createTodoSuccess,
  deleteTodo,
  deleteTodoSuccess,
  getTodos,
  getTodosSuccess,
  updateTodo,
  updateTodoSuccess,
} from './todo-list.action';
import { map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../../models/todo.interface';

@Injectable()
export class TodoListEffect {
  private actions = inject(Actions);
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000/todos';

  deleteTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(deleteTodo),
      mergeMap(({ id }) =>
        this.http
          .delete<TodoItem[]>(`${this.baseUrl}/${id}`)
          .pipe(map(() => deleteTodoSuccess({ id })))
      )
    )
  );

  getTodosEffect = createEffect(() =>
    this.actions.pipe(
      ofType(getTodos),
      mergeMap(() =>
        this.http
          .get<TodoItem[]>(this.baseUrl)
          .pipe(map((data: TodoItem[]) => getTodosSuccess({ todoList: data })))
      )
    )
  );

  createTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(createTodo),
      mergeMap(({ todo }) =>
        this.http
          .post<TodoItem>(this.baseUrl, todo)
          .pipe(
            map((todo: TodoItem) => createTodoSuccess({ createdTodo: todo }))
          )
      )
    )
  );

  updateTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(updateTodo),
      mergeMap(({ todo }) =>
        this.http
          .put<TodoItem>(this.baseUrl + '/' + todo._id, todo)
          .pipe(
            map((data: TodoItem) => updateTodoSuccess({ updatedTodo: data }))
          )
      )
    )
  );
}
