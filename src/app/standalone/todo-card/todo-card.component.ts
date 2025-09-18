import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoItem } from '../../models/todo.interface';
import { CheckboxComponent } from '../../input-components/checkbox.component';
import { HttpClient } from '@angular/common/http';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { props, Store } from '@ngrx/store';
import { deleteTodo, updateTodo } from '../../store/todo-list/todo-list.action';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create/create.component';

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
  ],
})
export class TodoCardComponent {
  @Input()
  public set todo(todo: TodoItem) {
    this._todo = todo;
  }

  public checked: boolean = false;
  public _todo!: TodoItem;
  public dialog = inject(MatDialog);

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

  public edit(todo: TodoItem): void {
    console.log('edit');
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        const updatedTodo: TodoItem = {
          ...todo,
          title: data,
        };

        if (todo.title !== data) {
          this.store.dispatch(updateTodo({ todo: updatedTodo }));
        }
      }
    });
  }
}
