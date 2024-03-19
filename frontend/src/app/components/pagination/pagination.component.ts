import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number;
  @Input() lastPage: number;

  @Output() currentPageEmitter = new EventEmitter<number>();

  // verificar
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentPage);
    console.log(changes);
    if (changes['currentPage']?.currentValue == 1) {
      this.currentPage = 1;
    }
  }

  goBackPage(): void {
    if (this.currentPage <= 1) {
      this.currentPage = 1;
    } else {
      this.currentPage -= 1;
    }
    this.currentPageEmitter.emit(this.currentPage);
  }

  goForwardPage(): void {
    if (this.currentPage >= this.lastPage) {
      this.currentPage = this.lastPage;
    } else {
      this.currentPage += 1;
    }
    this.currentPageEmitter.emit(this.currentPage);
  }
}
