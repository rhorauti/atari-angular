import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() isSideBarActive = false;
  @Output() isSideBarActiveEmitter = new EventEmitter<boolean>();

  hideSideBar(): void {
    this.isSideBarActiveEmitter.emit(false);
  }
}
