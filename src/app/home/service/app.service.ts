import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../core/service/base.service";
import {App} from "../model/app";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllApps(): Observable<App[]> {
    return this.get('app/all', 'json');
  }
}
