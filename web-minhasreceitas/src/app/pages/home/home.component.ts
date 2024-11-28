import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidenavMenuComponent} from '../../components/sidenav-menu/sidenav-menu.component';
import {Router, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {LoginService} from '../../services/login.service';
import {EditPasswordDialogComponent} from "./edit-password-dialog/edit-password-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "./edit-profile-dialog/edit-profile-dialog.component";
import {UserService} from "../../services/user.service";
import {Profile} from "../../types/profile.type";

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
export class HomeComponent implements OnInit {

  currentUserId = parseInt(<string>sessionStorage.getItem('user-id'));
  userData: Profile | null = null;

  private router = inject(Router);
  private loginService = inject(LoginService);
  readonly dialog = inject(MatDialog);
  readonly userService = inject(UserService);

  constructor() {
  }

  ngOnInit() {
    this.userService.getOne(this.currentUserId).subscribe(userData => {
      this.userData = userData;
    });
  }

  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '60px' : '250px')

  logout() {
    this.loginService.logout()
  }

  welcomeNavigate() {
    this.router.navigate(['/receitas'])
  }

  openEditPasswordDialog() {
    this.dialog.open(EditPasswordDialogComponent, {
      panelClass: 'my-outlined-dialog'
    })
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileDialogComponent, {
      data: this.userData,
      minWidth: '30vw',
      maxWidth: '100vw',
    }).afterClosed().subscribe(userData => {
      if (userData) {
        this.userData = userData;
      }
    });
  }
}
