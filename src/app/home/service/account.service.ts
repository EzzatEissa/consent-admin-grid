import {Injectable} from '@angular/core';
import {BaseService} from "../../core/service/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllUsersAccounts(userId: number): Observable<Account[]> {
    return this.get(`account/user/${userId}`, 'json');
  }

}
