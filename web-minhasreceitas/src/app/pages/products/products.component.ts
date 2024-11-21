import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from '../../types/product-type';

@Component({
  selector: 'app-products',
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
    MatDivider
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productForm!: FormGroup;
  displayedColumns: string[] = ['name', 'actions'];
  productService = inject(ProductService);
  toastrService = inject(ToastrService);
  products: ProductType[] = []
  filteredProducts: ProductType[] = []
  data = inject(MAT_DIALOG_DATA);
  searchControl = new FormControl('');


  constructor() {
    this.productForm = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required])
    })
    this.products = this.data.products
    this.filteredProducts = this.data.products
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(search => {
      this.filterRecipes(search);
    })
  }

  filterRecipes(search: string | null) {
    if (!search) {
      this.filteredProducts = [...this.products]
    } else {
      this.filteredProducts = this.products.filter(recipe => {
        return recipe.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

  submit() {
    this.productService.create(this.productForm.value.name).subscribe({
      next: () => {
        this.toastrService.success("Produto adicionado com sucesso!")
        this.productForm.reset()
        this.getAll()
      },
      error: err => this.toastrService.error(err.error.message)
    })
  }

  getAll() {
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data
        this.filteredProducts = [...this.products]
      },
      error: err => this.toastrService.error(err.error.message)
    })
  }

  testando(event: any) {
    console.log(event)
  }
}
