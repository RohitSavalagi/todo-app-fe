import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { TodoItem } from "../../models/todo.interface";
import { Store } from "@ngrx/store";
import { selectTodos } from "../../store/todo-list/todo-list.selector";
import { getTodos } from "../../store/todo-list/todo-list.action";

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrl: 'todo-list.component.less',
  imports: [
    AsyncPipe,
    TodoCardComponent
  ]
})
export class TodoListComponent {
  public todos$!: Observable<TodoItem[]>;

  private store = inject(Store);

  public ngOnInit(): void {
    this.store.dispatch(getTodos());
    this.todos$ = this.store.select(selectTodos);
  }
}
