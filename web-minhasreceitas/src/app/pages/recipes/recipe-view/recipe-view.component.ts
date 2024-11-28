import { Component, inject, OnInit } from '@angular/core';
import { RecipeResponse } from '../../../types/recipe.type';
import { MatCardModule } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    MatToolbar,
  ],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit {

  recipe!: RecipeResponse
  private router = inject(Router)

  ngOnInit(): void {
    this.recipe = history.state
  }

  edit() {
    this.router.navigate([`${this.router.url}/editar`])
  }

  delete(id: number) {

  }
}
