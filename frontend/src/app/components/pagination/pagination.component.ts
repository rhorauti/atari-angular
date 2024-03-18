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
  @Input() isPaginationReset = false;

  public currentPage = 1;
  public lastPage = 1;
  public qtyRegisterPerPage = 8;

  public pageInfo: IPage = {
    currentPage: 1,
    lastPage: 1,
    qtyRegisterPerPage: 8,
  };

  public tableIndexInfo = {
    tableInitialIdx: 0,
    tableLastIdx: 8,
  };

  public initalTableData = [{}];

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.findLastPage();
  //     this.findInitialIdx();
  //     this.findLastIdx();
  //   }, 100);
  // }

  resetPagination(): void {
    this.findLastPage();
    this.isPaginationReset = false;
  }

  ngOnChanges(): void {
    if (this.isPaginationReset) {
      this.resetPagination();
    } else if (this.tableData.length != 0) {
      this.findLastPage();
      this.findInitialIdx();
      this.findLastIdx();
    }
  }

  @Output() tableInitialIdx = new EventEmitter<number>();

  findInitialIdx(): void {
    this.tableIndexInfo.tableInitialIdx =
      this.pageInfo.currentPage == 1
        ? 0
        : (this.pageInfo.currentPage - 1) * this.pageInfo.qtyRegisterPerPage;
    this.tableInitialIdx.emit(this.tableIndexInfo.tableInitialIdx);
  }

  @Output() tableLastIdx = new EventEmitter<number>();

  findLastIdx(): void {
    this.tableIndexInfo.tableLastIdx =
      this.pageInfo.currentPage * this.pageInfo.qtyRegisterPerPage;
    this.tableLastIdx.emit(this.tableIndexInfo.tableLastIdx);
  }

  findLastPage(): void {
    if ((this.tableData && this.tableData.length > 0) ?? 0) {
      this.pageInfo.lastPage = Math.ceil(
        this.tableData.length / this.pageInfo.qtyRegisterPerPage
      );
    }
  }

  goBackPage(): void {
    if (this.pageInfo.currentPage) {
      if (this.pageInfo.currentPage <= 1) {
        this.pageInfo.currentPage = 1;
      } else {
        this.pageInfo.currentPage -= 1;
      }
    }
    this.findInitialIdx();
    this.findLastIdx();
  }

  goForwardPage(): void {
    if (this.pageInfo.currentPage && this.pageInfo.lastPage) {
      if (this.pageInfo.currentPage >= this.pageInfo.lastPage) {
        this.pageInfo.currentPage = this.pageInfo.lastPage;
      } else {
        this.pageInfo.currentPage += 1;
      }
    }
    this.findInitialIdx();
    this.findLastIdx();
  }
}
