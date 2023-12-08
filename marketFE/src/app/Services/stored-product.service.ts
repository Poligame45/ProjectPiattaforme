import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { AddUpdateCommandStoredProduct } from '../models/command/storedProductCommand/AddUpdateCommandStoredProduct';
import { GetDeleteStoredProductCommand } from '../models/command/storedProductCommand/GetDeleteStoredProductCommand';

@Injectable({
  providedIn: 'root'
})
export class StoredProductService {

  constructor(private httpClient: HttpClient) { }

  searchStoredProducts(body:SearchCommandStoredProduct): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products", body);
  }

  addStoredProduct(body:AddUpdateCommandStoredProduct): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products/addStoredProduct", body);
  }
  getStoredProduct(body:GetDeleteStoredProductCommand):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/products/getStoredProduct", body);
  }
}
