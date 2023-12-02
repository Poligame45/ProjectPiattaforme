import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged!: boolean;

  constructor(private httpClient: HttpClient) { }

  login(body: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/auth/authenticate", body);
  }
  register(body: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/auth/register", body);
  }

  logout() {
    sessionStorage.clear();
    this.isLogged = false;
  }

  getAuthorizationToken() {
    return sessionStorage.getItem("token");
  }
  getCurrentUser() {
    return sessionStorage.getItem("userId");
  }


}
