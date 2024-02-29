import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
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
