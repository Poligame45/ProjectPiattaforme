import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchOrdersCommand } from '../models/command/orderCommand/searchOrderCommand';
import { GetDeleteOrderCommand } from '../models/command/orderCommand/GetDeleteOrderCommand';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) { }

  searchOrders(body: SearchOrdersCommand): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/admin/searchOrders", body);
  }
  getOrder(body: GetDeleteOrderCommand): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/order/getOrder", body);
  }
}
