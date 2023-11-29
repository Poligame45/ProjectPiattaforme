import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoredProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(body:any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products", body);
  }

  //prova delle api
  addProduct(body:any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products/addStoredProduct", body);
  }
}
