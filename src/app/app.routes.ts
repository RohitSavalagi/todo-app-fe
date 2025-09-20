import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./standalone/register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./standalone/login/login').then((m) => m.Login),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./standalone/todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
  },
];
