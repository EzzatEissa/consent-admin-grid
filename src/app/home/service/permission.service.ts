import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "../../core/service/base.service";
import {Permission} from "../model/permission";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllPermissions(): Observable<Permission []>{
    return this.get(`permission/all`, 'json')
  }

  public savePermission(permission: Permission): Observable<any>{
    var params = new HttpParams();
    params.set('observe', 'response');
    return this.post(`permission`, permission, 'text', params);
  }
}
