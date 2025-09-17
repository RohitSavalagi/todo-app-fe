import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TodoItem } from "../../models/todo.interface";
import { CheckboxComponent } from "../../input-components/checkbox.component";
import { HttpClient } from "@angular/common/http";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { props, Store } from "@ngrx/store";
import { createTodo, deleteTodo, updateTodo } from "../../store/todo-list/todo-list.action";
import { MatDialog } from "@angular/material/dialog";
import { CreateTodoComponent } from "../create/create.component";
import { title } from "process";

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
  ]
})
export class TodoCardComponent implements OnInit {
  @Input()
  public set todo(todo: TodoItem) {
    this._todo = todo;
    this.formControl.patchValue(this._todo?.completed);
  };

  public checked: boolean = false;
  public _todo!: TodoItem;
  public formControl = new FormControl<boolean>(false);
  public dialog = inject(MatDialog);

  private http = inject(HttpClient);
  private store = inject(Store);

  ngOnInit() {
    this.formControl.valueChanges.subscribe(value => {
      this.handleValueChange(value ?? false, this._todo);
    });
  }

  public handleValueChange(value: boolean, todo: TodoItem): void {
    this.store.dispatch(updateTodo({ todo }))
  }

  public delete(todo: TodoItem): void {
    this.store.dispatch(deleteTodo({ id: todo._id }))
  }

  public edit(todo: TodoItem): void {
    console.log('edit');
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: todo
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        console.log(data);

        const updatedTodo: TodoItem = {
          ...todo,
          name: data,
        }

        if (todo.name !== data) {
          this.store.dispatch(updateTodo({ todo: updatedTodo }));
        }
      }
    });
  }
}
