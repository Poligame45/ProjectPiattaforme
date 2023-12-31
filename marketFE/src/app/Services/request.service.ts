import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AddUpdateRequestCommand } from '../models/command/requestCommand/addUpdateRequestCommand';

@Injectable({
    providedIn: 'root'
  })
  export class RequestService {

    constructor(private httpClient:HttpClient){}

    addRequest(body:AddUpdateRequestCommand):Observable<any>{
        return this.httpClient.post<any>("http://localhost:8080/request/addRequest", body);
    }
  }