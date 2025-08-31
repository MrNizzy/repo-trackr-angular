import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  public currentPage = input<number>(1);
  public hasNextPage = input<boolean>(false);

  public pageChange = output<number>();

  public goToPage(page: number): void {
    if (page === this.currentPage()) {
      return;
    }
    this.pageChange.emit(page);
  }

  public goToFirstPage(): void {
    if (this.currentPage() !== 1) {
      this.pageChange.emit(1);
    }
  }

  public goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  public goToNextPage(): void {
    if (this.hasNextPage()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}
