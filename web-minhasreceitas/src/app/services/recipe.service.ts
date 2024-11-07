import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeUrl, SERVER_URL } from '../shared/url/url.domain';
import { Recipe } from '../shared/model/recipe';
import { RecipeResponse } from '../types/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAll(categoryId: number) {
    return this.http.get<RecipeResponse[]>(SERVER_URL + RecipeUrl.GET_ALL + categoryId);
  }

  list(): Recipe[] {
    return [
      {
        id: 1,
        name: 'Teste',
        hint: 'hint_hint',
        image: 'image_image',
        preparationMode: 'preparationMode_preparationMode'
      }
    ]
  }
}
