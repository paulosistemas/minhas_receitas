import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeUrl, SERVER_URL } from '../shared/url/url.domain';
import { RecipeResponse } from '../types/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient)

  constructor() { }

  getAll(categoryId: number) {
    return this.http.get<RecipeResponse[]>(SERVER_URL + RecipeUrl.GET_ALL + categoryId);
  }

  save(recipe: RecipeResponse) {
    return this.http.post<RecipeResponse>(SERVER_URL + RecipeUrl.CREATE, recipe);
  }
}
