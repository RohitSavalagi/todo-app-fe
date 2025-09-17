import { inject, Injectable } from "@angular/core";
import {
    Actions,
    createEffect,
    ofType,
} from '@ngrx/effects';
import { createTodo, createTodoSuccess, deleteTodo, deleteTodoSuccess, getTodos, getTodosSuccess, updateTodo, updateTodoSuccess } from "./todo-list.action";
import { map, mergeMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TodoItem } from "../../models/todo.interface";

@Injectable()
export class TodoListEffect {
  private actions = inject(Actions);
  private http = inject(HttpClient);

  deleteTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(deleteTodo),
      mergeMap(({ id }) =>
        this.http.delete<TodoItem[]>(`http://localhost:3000/todos/${id}`).pipe(
          map((data: TodoItem[]) => deleteTodoSuccess({ todoList: data })),
        )
      )
    )
  );

  getTodosEffect = createEffect(() =>
    this.actions.pipe(
      ofType(getTodos),
      mergeMap(() =>
        this.http.get<TodoItem[]>('http://localhost:3000/todos').pipe(
          map((data: TodoItem[]) => getTodosSuccess({ todoList: data }))
        )
      )
    ),
  );


  createTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(createTodo),
      mergeMap(({ todo }) =>
      this.http.post<TodoItem[]>('http://localhost:3000/todos', todo).pipe(
        map((data: TodoItem[]) => createTodoSuccess({ todoList: data }))),
  )));

  updateTodoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(updateTodo),
      mergeMap(({ todo }) =>
      this.http.put<TodoItem[]>(
        'http://localhost:3000/todos/' + todo._id,
        todo
      ).pipe(
        map((data: TodoItem[]) => updateTodoSuccess({ todoList: data }))),
  )));
}
