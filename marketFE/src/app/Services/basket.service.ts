import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient: HttpClient) { }

  getBasket(body: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/basket/getBasket", body);
  }

  updateBasketItemQuantity(body:any):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/basket/updateBasketItemQuantity", body);
  }

  removeBasketItem(body:any):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/basket/removeBasketItem", body);
  }

  addItemInBasket(body:any):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/basket/addItemInBasket", body);
  }



}
