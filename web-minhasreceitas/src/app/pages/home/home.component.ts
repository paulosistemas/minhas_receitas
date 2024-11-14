import { Component, computed, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavMenuComponent,
    RouterOutlet,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatDivider
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private router = inject(Router);
  private loginService = inject(LoginService);

  constructor() {
  }

  username = sessionStorage.getItem('username');

  collapsed = signal(false)

  sidenavWidth = computed(()=> this.collapsed() ? '60px' : '250px')

  logout() {
    this.loginService.logout()
  }

  welcomeNavigate() {
    this.router.navigate(['/receitas'])
  }
}
