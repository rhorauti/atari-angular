import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonStandardComponent } from '../button/button-standard/button-standard.component';
import { InputFormComponent } from '../input/input-form/input-form.component';
import { FormsModule } from '@angular/forms';
import { ICompanyTableHeaders } from '../table/table.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStandardComponent,
    InputFormComponent,
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() tableHeadersData: ICompanyTableHeaders[] = [];
  @Output() showModalNewRegisterEmitter = new EventEmitter<boolean>();
  public isHeadersBoxActive = false;

  showNewRegister(): void {
    this.showModalNewRegisterEmitter.emit(true);
  }

  @Output() registerIdEmitter = new EventEmitter<number>();

  filterId(id: string) {
    this.registerIdEmitter.emit(Number(id));
  }

  @Output() registerNameEmitter = new EventEmitter<string>();

  filterName(nome: string) {
    this.registerNameEmitter.emit(nome);
  }

  @Output() clearInputIdEmitter = new EventEmitter<boolean>();

  clearInputId(): void {
    this.clearInputIdEmitter.emit(true);
  }

  @Output() clearInputNameEmitter = new EventEmitter<boolean>();

  clearInputName(): void {
    this.clearInputNameEmitter.emit(true);
  }

  @Output() isTableHeaderActiveEmitter = new EventEmitter<
    ICompanyTableHeaders[]
  >();

  showTableHeader(header: ICompanyTableHeaders): void {
    header.isChecked = !header.isChecked;
    this.isTableHeaderActiveEmitter.emit(this.tableHeadersData);
  }
}
