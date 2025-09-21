import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  model,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoItem } from '../../models/todo.interface';
import { CheckboxComponent } from '../../input-components/checkbox.component';
import { HttpClient } from '@angular/common/http';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { props, Store } from '@ngrx/store';
import { deleteTodo, updateTodo } from '../../store/todo-list/todo-list.action';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create/create.component';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-todo-card',
  templateUrl: 'todo-card.component.html',
  styleUrl: 'todo-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInput,
  ],
})
export class TodoCardComponent {
  @Input()
  public set todo(todo: TodoItem) {
    this._todo = todo;
    this.editMode = false;
  }

  public title = model('');
  public checked: boolean = false;
  public _todo!: TodoItem;
  public dialog = inject(MatDialog);
  public editMode = false;

  private store = inject(Store);

  public handleValueChange(value: boolean, todo: TodoItem): void {
    this.store.dispatch(
      updateTodo({
        todo: {
          ...todo,
          completed: value,
        },
      })
    );
  }

  public delete(todo: TodoItem): void {
    this.store.dispatch(deleteTodo({ id: todo._id }));
  }

  public updateTodo(todo: TodoItem): void {
    const updatedTodo: TodoItem = {
      ...todo,
      title: this.title(),
    };

    if (todo.title !== this.title()) {
      this.store.dispatch(updateTodo({ todo: updatedTodo }));
    }
  }

  public edit(todo: TodoItem): void {
    this.editMode = true;
    this.title.set(todo.title);
  }
}
