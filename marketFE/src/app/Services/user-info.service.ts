import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDeleteUserInfoCommand } from '../models/command/userCommand/GetDeleteUserInfoCommand';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient:HttpClient) { }


  getUserInfo(body: GetDeleteUserInfoCommand): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/userInfo/getUserInfo", body);
  }

}
