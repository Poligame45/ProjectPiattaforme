import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient) { }

  login(body:any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/auth/authenticate",body);
  }
}
