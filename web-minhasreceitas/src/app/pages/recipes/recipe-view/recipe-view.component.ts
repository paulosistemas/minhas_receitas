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
import { DeleteModalComponent } from '../../../shared/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../../services/recipe.service';
import { MatButton } from '@angular/material/button';

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
    MatButton,
  ],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit {

  recipe!: RecipeResponse
  private router = inject(Router)
  readonly dialog = inject(MatDialog);
  private recipeService = inject(RecipeService);
  toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.recipe = history.state
  }

  edit() {
    this.router.navigate([`${this.router.url}/editar`])
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: { message: 'Tem certeza que seja excluir a receita?' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.delete(id).subscribe({
          next: () => {
            this.toastrService.success("Receita excluido com sucesso!")
            const currentUrl = this.router.url
            const parentUrl = currentUrl.split('/').slice(0, -1).join('/')
            this.router.navigate([parentUrl])
          },
          error: err => this.toastrService.error(err.error.message)
        })
      }
    })
  }
}
