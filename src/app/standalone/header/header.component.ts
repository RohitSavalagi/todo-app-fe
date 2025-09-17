import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CreateTodoComponent } from '../create/create.component';

@Component({
  selector: 'app-header',
  imports: [MatButton, MatIcon, MatDialogModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  public dialog = inject(MatDialog);

  public openCreateTodoPopup(): void {
    this.dialog.open(CreateTodoComponent);
  }
}
