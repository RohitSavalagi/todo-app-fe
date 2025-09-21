// loading-overlay.component.ts
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  styleUrl: 'loading.component.less',
  template: `
    @if (loadingService.loading$ | async) {
    <div class="loading-overlay">
      <mat-progress-spinner
        mode="indeterminate"
        diameter="60"
        color="primary"
      ></mat-progress-spinner>
    </div>
    }
  `,
  imports: [MatProgressSpinner, AsyncPipe],
})
export class LoadingOverlayComponent {
  constructor(public loadingService: LoadingService) {}
}
