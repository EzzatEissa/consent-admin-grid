import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../model/account';
import {Balance} from '../model/balance';
import {ApiUrl} from '../utilities/api-url';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  static accountObj: any;
  private baseURL = this.apiUrl.get();
  private balancesUrl = this.apiUrl.get() + '/balances';


  static userId: string;
  static accountId: string;
  static account: Account;
  static viewInListFlag: boolean;

  constructor(private http: HttpClient, public apiUrl: ApiUrl) {
  }

  setAccountObj(account) {
    BalancesService.accountObj = account
  }

  getAccountObj() {
    return BalancesService.accountObj;
  }


  getBalancesWithAccountId(accountId): Observable<any> {
    let url = this.baseURL + '/accounts/' + accountId + '/balances'
    return this.http.get(url);
  }

  saveBalance(balance: Balance) {
    const body = JSON.stringify(balance);
    console.log(body)
    return this.http.post(this.baseURL + '/balances/add-balance', body, BalancesService.putHttpRequestOptions);
  }

  updateBalance(balance: Balance) {
    let id = balance.balanceId;
    const body = JSON.stringify(balance);
    console.log(body)
    return this.http.put(`${this.balancesUrl}/${id}`, body, BalancesService.putHttpRequestOptions)

  }

  deleteBalance(id: number): Observable<any> {
    return this.http.delete(`${this.balancesUrl}/${id}`, {responseType: 'json'});
  }

  public static putHttpRequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
}
