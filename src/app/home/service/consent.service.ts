import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {BaseService} from "../../core/service/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsentService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }


  public getConsentByUserName(userName: string): Observable<any>{
    return this.get(`account-access-consents/user/${userName}`, 'json');
  }

  public getConsentByUserId(id: number): Observable<any[]>{
    return this.get(`account-access-consents/user/${id}`, 'json');
  }

  public getConsentAppsByUserId(id: number): Observable<any>{
    return this.get(`account-access-consents/app/${id}`, 'json');
  }
}
