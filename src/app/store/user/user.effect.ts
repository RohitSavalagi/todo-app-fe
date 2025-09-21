import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clearUserInfo,
  clearUserInfoSuccess,
  loginUser,
  loginUserSuccess,
  registerUser,
  registerUserSuccess,
} from './user.action';
import { map, mergeMap, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class UserEffect {
  private actions = inject(Actions);
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:4000/user';
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  registerUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(registerUser),
      mergeMap(({ user }) => {
        console.log('register effect');
        return this.http.post(this.baseUrl + '/register', user).pipe(
          map(() => {
            this._snackBar.open('registarion successful', 'ok', {
              duration: 3000,
            });
            this.router.navigate(['/login']);
            return registerUserSuccess({ user });
          })
        );
      })
    )
  );

  loginUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(loginUser),
      mergeMap(({ user }) => {
        return this.http
          .post<{ token: string }>(this.baseUrl + '/login', user)
          .pipe(
            map(({ token }) => {
              this._snackBar.open('login successful', 'ok', {
                duration: 3000,
              });
              this.router.navigate(['/todos']);
              localStorage.setItem('authToken', token);
              localStorage.setItem('userName', user.userName);
              return loginUserSuccess({ token });
            })
          );
      })
    )
  );

  clearUserInfoEffect = createEffect(() =>
    this.actions.pipe(
      ofType(clearUserInfo),
      mergeMap(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this._snackBar.open('User info cleared successful', 'ok', {
          duration: 3000,
        });
        return of(clearUserInfoSuccess());
      })
    )
  );
}
