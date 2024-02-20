import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IPage } from './IPage';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() tableData = [{}];
  @Output() tableInitialIdx = new EventEmitter<number>();
  @Output() tableLastIdx = new EventEmitter<number>();
  public pageInfo: IPage = {
    currentPage: 1,
    lastPage: 1,
    qtyRegisterPerPage: 9,
  };
  public tableIndexInfo = {
    tableInitialIdx: 0,
    tableLastIdx: 9,
  };

  findInitialIdx(): void {
    if (this.pageInfo.currentPage && this.pageInfo.qtyRegisterPerPage) {
      this.tableIndexInfo.tableInitialIdx =
        this.pageInfo.currentPage == 1
          ? 0
          : (this.pageInfo.currentPage - 1) * this.pageInfo.qtyRegisterPerPage;
      this.tableInitialIdx.emit(this.tableIndexInfo.tableInitialIdx);
    } else {
      this.tableInitialIdx.emit(this.tableIndexInfo.tableInitialIdx);
    }
  }

  findLastIdx(): void {
    if (this.pageInfo.currentPage && this.pageInfo.qtyRegisterPerPage) {
      this.tableIndexInfo.tableLastIdx =
        this.pageInfo.currentPage * this.pageInfo.qtyRegisterPerPage;
      this.tableLastIdx.emit(this.tableIndexInfo.tableLastIdx);
    } else {
      this.tableLastIdx.emit(this.tableIndexInfo.tableLastIdx);
    }
  }

  findCurrentPage(): void {
    if (this.pageInfo.currentPage > this.pageInfo.lastPage) {
      this.tableIndexInfo = {
        tableInitialIdx: 0,
        tableLastIdx: 9,
      };
    }
  }

  findLastPage(): void {
    if (
      this.tableData &&
      this.pageInfo.qtyRegisterPerPage &&
      this.pageInfo.currentPage
    ) {
      this.pageInfo.lastPage = Math.ceil(
        this.tableData.length / this.pageInfo.qtyRegisterPerPage
      );
    } else {
      this.pageInfo.lastPage = 1;
    }
  }

  ngOnChanges(): void {
    this.findLastPage();
    this.findCurrentPage();
    this.findInitialIdx();
    this.findLastIdx();
    console.log(this.pageInfo);
    console.log(this.tableIndexInfo);
  }

  goBackPage(): void {
    if (this.pageInfo.currentPage) {
      if (this.pageInfo.currentPage <= 1) {
        this.pageInfo.currentPage = 1;
      } else {
        this.pageInfo.currentPage -= 1;
      }
      this.findInitialIdx();
      this.findLastIdx();
    } else {
      return;
    }
  }

  goForwardPage(): void {
    if (this.pageInfo.currentPage && this.pageInfo.lastPage) {
      if (this.pageInfo.currentPage >= this.pageInfo.lastPage) {
        this.pageInfo.currentPage = this.pageInfo.lastPage;
      } else {
        this.pageInfo.currentPage += 1;
      }
      this.findInitialIdx();
      this.findLastIdx();
    } else {
      return;
    }
  }
}
