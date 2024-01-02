import { UserDTO } from 'src/app/models/dto/userDTO/userDTO';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
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

  registerAdmin(body:any): Observable<UserDTO>{
    return this.httpClient.post<any>("http://localhost:8080/admin/registerAdmin", body);

  }

  logout() {
    this.isLogged = false;
    sessionStorage.clear();
  }

  getAuthorizationToken() {
    return sessionStorage.getItem("token");
  }
  getCurrentUser() {
    return sessionStorage.getItem("userId");
  }


}
