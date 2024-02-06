import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-standard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button-standard.component.html',
  styleUrl: './button-standard.component.scss',
})
export class ButtonStandardComponent implements OnInit {
  @Input() label = 'Entrar';
  @Input() btnClass = '';
  @Input() btnType = 'submit';
  @Input() btnIcon = '';
  @Input() showIcon = false;
  @Input() showLabel = true;
  @Input() width = 'w-full';
  @Input() isDisabled = false;
  @Input() backgroundColor = '';
  @Input() textColor = '';
  @Input() height = '';
  @Input() border = '';
  public labelColor = 'text-white';
  public hoverBackgroundColor = '';

  ngOnInit(): void {
    switch (this.btnType) {
      case 'submit': {
        this.backgroundColor = 'bg-logo-blue';
        this.hoverBackgroundColor = 'hover:bg-logo-blue-hover';
        break;
      }
      case 'close': {
        this.backgroundColor = 'bg-black';
        this.label = 'Fechar';
        this.hoverBackgroundColor = 'hover:bg-gray-800';
        break;
      }
      case 'cancel': {
        this.backgroundColor = 'bg-red-500';
        this.showIcon = true;
        this.btnIcon = 'close';
        this.label = 'Cancelar';
        this.hoverBackgroundColor = 'hover:bg-red-400';
        break;
      }
      case 'success': {
        this.backgroundColor = 'bg-green-600';
        this.showIcon = true;
        this.btnIcon = 'save';
        this.label = 'Prosseguir';
        this.hoverBackgroundColor = 'hover:bg-green-500';
        break;
      }
      case 'transparent': {
        this.backgroundColor = 'bg-transparent';
        this.border = 'border border-gray-500';
        this.hoverBackgroundColor = 'hover:bg-gray-800';
        break;
      }
      case 'warning': {
        this.backgroundColor = 'bg-yellow-400';
        this.hoverBackgroundColor = 'hover:bg-yellow-300';
        this.btnIcon = 'edit';
        this.height = 'h-6';
        this.border = 'border border-gray-500';
        this.textColor = 'text-black';
        this.label = '';
        break;
      }
      case 'danger': {
        this.backgroundColor = 'bg-red-500';
        this.hoverBackgroundColor = 'hover:bg-red-400';
        this.btnIcon = 'delete_outline';
        this.height = 'h-6';
        this.border = 'border border-gray-500';
        this.textColor = 'text-black';
        this.label = '';
        break;
      }
      default:
        'submit';
    }
  }
}
