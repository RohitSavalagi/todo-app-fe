import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clearUserInfo,
  clearUserInfoSuccess,
  loginUser,
  loginUserSuccess,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from './user.action';
import { catchError, map, mergeMap, of } from 'rxjs';
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
        return this.http.post(this.baseUrl + '/register', user).pipe(
          map(() => {
            this._snackBar.open('Registration successful', 'OK', {
              duration: 3000,
            });
            this.router.navigate(['/login']);
            return registerUserSuccess({ user });
          }),
          catchError((error) => {
            let errorMessage = 'Something went wrong. Please try again.';

            if (error.status === 409) {
              errorMessage =
                'Username already exists. Please choose another one.';
            } else if (error.status === 400) {
              errorMessage = error.error?.error || 'Invalid input data';
            }

            this._snackBar.open(errorMessage, 'Close', {
              duration: 4000,
            });
            return of(registerUserFailure({ error: errorMessage }));
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
