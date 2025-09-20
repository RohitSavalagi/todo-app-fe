import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.mode';
import { loginUser, registerUser } from '../../store/user/user.action';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatInput,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.less',
})
export class Login {
  public store$ = inject(Store);
  public formGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login(): void {
    const { userName, password } = this.formGroup.value;
    if (!userName || !password) return;
    const user: User = {
      userName: userName,
      password: password,
    };
    this.store$.dispatch(loginUser({ user }));
  }
}
