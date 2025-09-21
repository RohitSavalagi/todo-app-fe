import { AsyncPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoItem } from '../../models/todo.interface';
import { Store } from '@ngrx/store';
import { selectTodos } from '../../store/todo-list/todo-list.selector';
import { createTodo, getTodos } from '../../store/todo-list/todo-list.action';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
})
export class TodoListComponent {
  public todos$!: Observable<TodoItem[]>;
  public title = model('');

  private store$ = inject(Store);

  ngOnInit(): void {
    this.store$.dispatch(getTodos());
    this.todos$ = this.store$.select(selectTodos)
      .pipe(
        map(todos => {
          this.title.set('');
          return todos;
        })
      );
  }

  addTodo(): void {
    this.store$.dispatch(
      createTodo({
        todo: {
          title: this.title(),
          completed: false,
        },
      })
    );
  }
}
