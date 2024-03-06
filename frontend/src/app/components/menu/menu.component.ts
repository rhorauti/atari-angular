import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface ISublink {
  idSublink: number;
  name: string;
  isSelected: boolean;
  routerLink: string;
}

interface ILink {
  idLink: number;
  name: string;
  sublinks: ISublink[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @ViewChildren('linkItem') linksItem!: QueryList<ElementRef>;
  @ViewChildren('linkIcon') linkIcon!: QueryList<ElementRef>;

  @Input() isSideBarActive = false;
  @Output() isSideBarActiveEmitter = new EventEmitter<boolean>();

  public links: ILink[] = [
    {
      idLink: 0,
      name: 'Cadastros',
      sublinks: [
        {
          idSublink: 0,
          name: 'Clientes',
          isSelected: false,
          routerLink: '/customers',
        },
        {
          idSublink: 1,
          name: 'Fornecedores',
          isSelected: false,
          routerLink: '/suppliers',
        },
        {
          idSublink: 2,
          name: 'Sitio Nakano',
          isSelected: false,
          routerLink: '/sitio-nakano',
        },
        {
          idSublink: 3,
          name: 'Compras',
          isSelected: false,
          routerLink: '/compras',
        },
        {
          idSublink: 4,
          name: 'Vendas',
          isSelected: false,
          routerLink: '/vendas',
        },
        { idSublink: 5, name: 'Misc', isSelected: false, routerLink: '/misc' },
      ],
    },
    {
      idLink: 1,
      name: 'Relatórios',
      sublinks: [
        {
          idSublink: 0,
          name: 'Clientes',
          isSelected: false,
          routerLink: '/customers',
        },
        {
          idSublink: 1,
          name: 'Fornecedores',
          isSelected: false,
          routerLink: '/suppliers',
        },
        {
          idSublink: 1,
          name: 'Sitio Nakano',
          isSelected: false,
          routerLink: '/sitio-nakano',
        },
      ],
    },
  ];

  hideSideBar(): void {
    this.isSideBarActiveEmitter.emit(false);
  }

  public isColapsed = false;

  toogleLink(link: ILink): void {
    this.linksItem
      .get(link.idLink)
      .nativeElement.classList.toggle('is-colapsed');
    if (
      this.linkIcon.get(link.idLink).nativeElement.firstChild.innerHTML ==
      'keyboard_arrow_down'
    ) {
      this.linkIcon.get(link.idLink).nativeElement.firstChild.innerHTML =
        'keyboard_arrow_up';
    } else if (
      this.linkIcon.get(link.idLink).nativeElement.firstChild.innerHTML ==
      'keyboard_arrow_up'
    ) {
      this.linkIcon.get(link.idLink).nativeElement.firstChild.innerHTML =
        'keyboard_arrow_down';
    }

    // this.linkIcon.get(link.idLink).nativeElement.innerHTML =
    //   'keyboard_arrow_up';
  }

  clearSubLinkSelection(): void {
    this.links.forEach(link =>
      link.sublinks.forEach(sublink => (sublink.isSelected = false))
    );
  }

  selectSubLink(sublink: ISublink): void {
    this.clearSubLinkSelection();
    sublink.isSelected = true;
  }
}
