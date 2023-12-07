import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCommandStoredProduct } from '../models/command/storedProductCommand/SearchCommandStoredProduct';
import { AddUpdateCommandStoredProduct } from '../models/command/storedProductCommand/AddUpdateCommandStoredProduct';

@Injectable({
  providedIn: 'root'
})
export class StoredProductService {

  constructor(private httpClient: HttpClient) { }

  search(body:SearchCommandStoredProduct): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products", body);
  }

  addProduct(body:AddUpdateCommandStoredProduct): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/products/addStoredProduct", body);
  }
  
}
