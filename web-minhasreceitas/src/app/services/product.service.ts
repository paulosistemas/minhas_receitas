import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductUrl, SERVER_URL } from '../shared/url/url.domain';
import { ProductType } from '../types/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient)
  constructor() { }

  getAll() {
    return this.http.get<ProductType[]>(SERVER_URL + ProductUrl.PRODUCT_URL);
  }

  create(name: string) {
    return this.http.post<ProductType>(SERVER_URL + ProductUrl.CREATE, { name });
  }

  update(id: number, name: string) {
    return this.http.put<ProductType>(SERVER_URL + ProductUrl.UPDATE + id, { name });
  }

  delete(id: number) {
    return this.http.delete(SERVER_URL + ProductUrl.DELETE + id);
  }
}
