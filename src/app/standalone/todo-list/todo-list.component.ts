import { AsyncPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoItem } from '../../models/todo.interface';
import { Store } from '@ngrx/store';
import { selectTodos } from '../../store/todo-list/todo-list.selector';
import { createTodo, getTodos } from '../../store/todo-list/todo-list.action';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrl: 'todo-list.component.less',
  imports: [
    AsyncPipe,
    TodoCardComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatError,
  ],
})
export class TodoListComponent {
  todos$!: Observable<TodoItem[]>;
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  private store$ = inject(Store);

  ngOnInit(): void {
    this.store$.dispatch(getTodos());
    this.todos$ = this.store$.select(selectTodos);
  }

  addTodo(): void {
    const title = this.todoForm.value.title;
    if (title) {
      this.store$.dispatch(
        createTodo({
          todo: {
            title: title as string,
            completed: false,
          },
        })
      );
      this.todoForm.reset();
      Object.values(this.todoForm.controls).forEach((control) => {
        control.setErrors(null);
      });
    }
  }
}
