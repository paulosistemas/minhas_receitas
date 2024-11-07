import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    MatToolbar,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  constructor() {
    this.recipeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
  }

  ngOnInit(): void {
  }
}
