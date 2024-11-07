import { Component, inject, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { CategoryData } from '../../types/category-data.type';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatIconButton,
    MatDividerModule,
    RouterLink,
    MatFabButton,
    MatMiniFabButton
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss'
})
export class SidenavMenuComponent {
  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }

  menuItems = signal<CategoryData[]>([
    {
      id: 2,
      icon: 'cake',
      label: 'Bolos e Tortas',
      route: 'bolos',
    },
    {
      id: 4,
      icon: 'dinner_dining',
      label: 'Refeições',
      route: 'refeicoes',
    },
    {
      id: 5,
      icon: 'icecream',
      label: 'Sobremesas',
      route: 'sobremesas',
    },
    {
      id: 1,
      icon: 'local_drink',
      label: 'Bebidas',
      route: 'bebidas',
    },
    {
      id: 3,
      icon: 'local_bar',
      label: 'Drinks',
      route: 'drinks',
    }
  ])

  private router = inject(Router);

  constructor() {
  }

  browseCategories(item: CategoryData) {
    this.router.navigate([`/receitas/${item.route}`])
  }

  addRecipe() {
    this.router.navigate(['/receitas/adicionar'])
  }
}
