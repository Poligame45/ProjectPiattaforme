import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AddUpdateRequestCommand } from '../models/command/requestCommand/addUpdateRequestCommand';
import { SearchRequestCommand } from '../models/command/requestCommand/searchRequestCommand';
import { GetDeleteRequestCommand } from '../models/command/requestCommand/getDeleteRequestCommand';
import { RequestDTO } from '../models/dto/request/requestDTO';
import { ListRequestDTO } from '../models/dto/request/listRequestDTO';

@Injectable({
    providedIn: 'root'
  })
  export class RequestService {

    constructor(private httpClient:HttpClient){}

    addRequest(body:AddUpdateRequestCommand):Observable<RequestDTO>{
        return this.httpClient.post<any>("http://localhost:8080/request/addRequest", body);
    }
    search(body:SearchRequestCommand):Observable<ListRequestDTO>{
      return this.httpClient.post<any>("http://localhost:8080/request/searchRequest", body);
    }

    getRequest(body:GetDeleteRequestCommand):Observable<RequestDTO>{
      return this.httpClient.post<any>("http://localhost:8080/request/getRequest", body);
    }

  }