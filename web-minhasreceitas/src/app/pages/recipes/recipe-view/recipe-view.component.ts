import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.recipe = history.state
  }
}
