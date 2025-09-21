import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './standalone/header/header.component';
import { Store } from '@ngrx/store';
import { registerUser, registerUserSuccess } from './store/user/user.action';
import { SafeUser, User } from './models/user.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
  imports: [CommonModule, FormsModule, RouterOutlet, HeaderComponent],
})
export class App {
  store$ = inject(Store);

  ngOnInit(): void {
    const token = localStorage.getItem('authToken') || '';
    const userName = localStorage.getItem('userName') || '';

    const user: SafeUser = {
      userName: userName,
      token: token,
    };

    if (token && userName) {
      this.store$.dispatch(registerUserSuccess({ user }));
    }
  }
}
