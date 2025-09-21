import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  model,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoItem } from '../../models/todo.interface';
import { CheckboxComponent } from '../../input-components/checkbox.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { deleteTodo, updateTodo } from '../../store/todo-list/todo-list.action';
import { MatDialog } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';

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
    MatError,
  ],
})
export class TodoCardComponent {
  @Input()
  set todo(todo: TodoItem) {
    this._todo = todo;
    this.editMode = false;
  }

  checked: boolean = false;
  _todo!: TodoItem;
  dialog = inject(MatDialog);
  editMode = false;
  updateForm = new FormGroup({
    title: new FormControl(this._todo?.title, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  private store = inject(Store);

  handleValueChange(value: boolean, todo: TodoItem): void {
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
    if (this.updateForm?.value?.title) {
      const updatedTodo: TodoItem = {
        ...todo,
        title: this.updateForm.value.title,
      };

      if (todo.title !== this.updateForm?.value?.title) {
        this.store.dispatch(updateTodo({ todo: updatedTodo }));
      }
    }
  }

  public edit(todo: TodoItem): void {
    this.editMode = true;
    this.updateForm.patchValue({
      title: todo.title,
    });
  }
}
