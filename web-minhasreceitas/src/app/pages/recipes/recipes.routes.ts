import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

export const RECIPE_ROUTES: Routes = [
  { path: '', component: RecipeListComponent },
  { path: ':id', component: RecipeViewComponent },
]
