import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RecipeResponse } from '../../../types/recipe.type';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbar,
    MatProgressSpinner,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipes:RecipeResponse[] = []
  filteredRecipes: RecipeResponse[] = []
  category!: string;
  loading = true;
  categoryName = ''

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private toastrService = inject(ToastrService);
  searchControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchControl.setValue('')
      this.category = params['category'];
      this.loadData(this.category)
    })
    this.searchControl.valueChanges.subscribe(search => {
      this.filterRecipes(search);
    })
  }

  filterRecipes(search: string | null) {

    if (!search) {
      this.filteredRecipes = [...this.recipes]
    } else {
      this.filteredRecipes = this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

  loadData(category: string) {
    this.loading = true;
    this.recipes = []
    switch (category) {
      case 'bolos':
        this.categoryName = 'Bolos e Tortas';
        this.fetchDataApi(2)
        break
      case 'refeicoes':
        this.categoryName = 'Refeições';
        this.fetchDataApi(4)
        break
      case 'sobremesas':
        this.categoryName = 'Sobremesas';
        this.fetchDataApi(5)
        break
      case 'bebidas':
        this.categoryName = 'Bebidas';
        this.fetchDataApi(1)
        break
      case 'drinks':
        this.categoryName = 'Drinks';
        this.fetchDataApi(3)
        break
    }
  }

  fetchDataApi(categoryId: number) {
    this.recipeService.getAll(categoryId)
      .subscribe({
        next: data => {
          this.recipes = data
          this.filteredRecipes = [...this.recipes]
          this.loading = false
        },
        error: err => {
          this.toastrService.error(err.error.message)
          this.loading = false
        }
      })
  }

  viewRecipe(recipe: RecipeResponse) {
    this.router.navigate([`${this.router.url}/${recipe.id}`], { state: recipe });
  }
}
