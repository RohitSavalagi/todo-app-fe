import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/user/user.action';
import { User } from '../../models/user.mode';
@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.less',
})
export class Register {
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

  register(): void {
    const { userName, password } = this.formGroup.value;
    if (!userName || !password) return;
    const user: User = {
      userName: userName,
      password: password,
    };
    this.store$.dispatch(registerUser({ user }));
  }
}
