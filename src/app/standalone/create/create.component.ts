import { Component, inject, model, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/state";
import { createTodo } from "../../store/todo-list/todo-list.action";
import { TodoItem } from "../../models/todo.interface";

@Component({
  selector: 'app-create-todo',
  templateUrl: 'create.component.html',
  styleUrl: 'create.component.less',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatDialogClose,
]
})
export class CreateTodoComponent implements OnInit {
  public title = model('');
  public mode: 'create' | 'update' = 'create';

  private dialogRef = inject(MatDialogRef<CreateTodoComponent>);
  private store$ = inject(Store<AppState>);
  private data = inject<TodoItem>(MAT_DIALOG_DATA);


  public ngOnInit(): void {
    if (this.data.name) {
      this.title.set(this.data.name);
      this.mode = 'update';
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    this.store$.dispatch(createTodo({todo: {
      name: this.title(),
      completed: false
    }}))
    this.dialogRef.close();
  }
}
