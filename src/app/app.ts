import { Component } from '@angular/core';
import { TodoListComponent } from "./standalone/todo-list/todo-list.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from "./standalone/header/header.component";
import { TodoListEffect } from './store/todo-list/todo-list.effect';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
  imports: [
    TodoListComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
],
})
export class App {
}
