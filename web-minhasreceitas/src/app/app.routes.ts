import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'recover',
    component: RecoverPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];
