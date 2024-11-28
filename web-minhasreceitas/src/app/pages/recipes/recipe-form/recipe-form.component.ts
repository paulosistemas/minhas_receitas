import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { FormArray, FormControl, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RecipeService } from '../../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { ProductType } from '../../../types/product-type';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsComponent } from '../../products/products.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    MatToolbar,
    MatSelectModule,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatIconButton,
    MatCard,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {

  recipeForm!: FormGroup;
  ingredientForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  categoryList = [
    { 'id': 1, 'name': 'Bebidas' },
    { 'id': 2, 'name': 'Bolos e Tortas' },
    { 'id': 3, 'name': 'Drinks' },
    { 'id': 4, 'name': 'Refeições' },
    { 'id': 5, 'name': 'Sobremesas' }
  ]

  unitList = [
    { 'id': 1, 'name': 'Colher(s) de Chá' },
    { 'id': 2, 'name': 'Colher(s) de Sopa' },
    { 'id': 3, 'name': 'Grama(s)' },
    { 'id': 4, 'name': 'Kg' },
    { 'id': 5, 'name': 'Lata(s)' },
    { 'id': 6, 'name': 'Litro(s)' },
    { 'id': 7, 'name': 'ml' },
    { 'id': 8, 'name': 'Unidade(s)' },
    { 'id': 9, 'name': 'Xícara(s)' }
  ]

  displayedColumns: string[] = ['amount', 'unit', 'productName', 'action'];
  products: ProductType[] = []
  private productService = inject(ProductService);
  private recipeService = inject(RecipeService);
  private toastrService = inject(ToastrService);
  private route = inject(ActivatedRoute);
  recipeId: number | null = null;

  constructor() {
    this.recipeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      preparationMode: new FormControl('', [Validators.required]),
      category: new FormGroup({
        id: new FormControl('', [Validators.required]),
      }),
      ingredients: new FormArray([], [Validators.required]),
      hint: new FormControl('', []),
      image: new FormControl('', []),
    })

    this.ingredientForm = new FormGroup({
      amount: new FormControl('', []),
      unit: new FormGroup({
        id: new FormControl('', []),
        name: new FormControl('', []),
      }),
      product: new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', []),
      })
    })
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['id'];
    console.log('recipeId', this.recipeId);
    this.getAll();
  }

  getAll() {
    this.productService.getAll()
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => this.toastrService.error(err.error.message),
      })
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray
  }

  addIngredient() {
    this.removeFormControl()
    this.ingredients.push(new FormGroup({
      amount: new FormControl(this.ingredientForm.get('amount')?.value),
      unit: new FormControl(this.ingredientForm.get('unit.id')?.value),
      product: new FormControl(this.ingredientForm.get('product.id')?.value),
    }))
    this.ingredientForm.reset()

    this.addFormControl()
  }

  removeFormControl(): void {
    if (!this.ingredientForm.get('amount')?.value) {
      this.ingredientForm.removeControl('amount')
    }
    if (!this.ingredientForm.get('unit.id')?.value) {
      this.ingredientForm.removeControl('unit')
    }
  }

  addFormControl(): void {
    if (!this.ingredientForm.get('amount')) {
      this.ingredientForm.addControl('amount', new FormControl('', []))
    }
    if (!this.ingredientForm.get('unit')) {
      this.ingredientForm.addControl('unit', new FormGroup({
        id: new FormControl('', []),
      }))
    }
  }

  removeIngredient(ingredient: FormControl): void {
    this.ingredients.controls.map(data => {
      if (ingredient === data.value) {
        this.ingredients.removeAt(data.value)
      }
    })
  }

  submit() {
    this.recipeService.save(this.recipeForm.value)
      .subscribe({
      next: () => {
        this.toastrService.success("Receita salva com sucesso!")
        this.recipeForm.reset()
      },
      error: err => this.toastrService.error(err.error.message)
    })
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        let base64Image = reader.result as string;
        this.recipeForm.patchValue({ image: base64Image })
      };
      reader.readAsDataURL(file)
    }
  }

  manageProduct() {
    const dialogRef = this.dialog.open(ProductsComponent, {
      panelClass: 'my-outlined-dialog',
      data: {
        products: this.products
      }
    })

    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    })
  }
}

