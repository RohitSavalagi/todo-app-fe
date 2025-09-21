import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.selector';
import { Observable } from 'rxjs';
import { User } from '../../models/user.mode';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { clearUserInfo } from '../../store/user/user.action';

@Component({
  selector: 'app-header',
  imports: [
    MatDialogModule,
    MatButtonModule,
    AsyncPipe,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  dialog = inject(MatDialog);
  store$ = inject(Store);
  userInfo$: Observable<User> = this.store$.select(selectUser);

  logout(): void {
    this.store$.dispatch(clearUserInfo());
  }
}
