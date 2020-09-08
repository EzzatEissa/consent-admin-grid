import { Injectable } from '@angular/core';
import {BaseService} from "../../core/service/base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {UserSearch} from "../model/user-search";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }


  public getConsentByUserName(userName: string): Observable<any>{
    return this.get(`account-access-consents/user/${userName}`, 'json');
  }

  public getUsers(userSearch: UserSearch): Observable<any>{

    var params = new HttpParams();
      if (userSearch.userName) {
        params =  params.append('userName', userSearch.userName);
      }
      if (userSearch.firstName) {
        params =  params.append('firstName', userSearch.firstName);
      }
      if (userSearch.lastName) {
        params =  params.append('lastName', userSearch.lastName);
      }
      if (userSearch.segment) {
        params =  params.append('segment', userSearch.segment);
      }
      if (userSearch.accountNumber) {
        params =  params.append('accountNumber', userSearch.accountNumber);
      }
    return this.get(`user/search`, 'json', params);
  }

  public getUserByName(userName: string): Observable<any>{
    return this.get(`user/${userName}`, 'json');
  }

}
