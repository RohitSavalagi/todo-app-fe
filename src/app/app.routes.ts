import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
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
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./standalone/todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
