import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './config/auth.guard';
import { categoryGuard } from './config/category.guard';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: RegisterComponent
  },
  {
    path: 'recuperar',
    component: RecoverPasswordComponent
  },
  {
    path: 'receitas',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'adicionar',
        loadComponent: () => import('./pages/recipes/recipe-form/recipe-form.component').then(c => c.RecipeFormComponent)
      },
      {
        path: 'editar',
        loadComponent: () => import('./pages/recipes/recipe-form/recipe-form.component').then(c => c.RecipeFormComponent)
      },
      {
        path: ':category',
        loadChildren: () => import('./pages/recipes/recipes.routes').then(r => r.RECIPE_ROUTES),
        canActivate: [authGuard, categoryGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];
