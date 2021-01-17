import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/account';
import {Router} from '@angular/router';
import {ApiUrl} from '../utilities/api-url';


@Injectable({
  providedIn: 'root'
})

export class AccountServiceService {
  private accountsUrl = this.apiUrl.get() + '/accounts';
  private usersURL = this.apiUrl.get() + '/user/';

  constructor(private router: Router, private http: HttpClient, public apiUrl: ApiUrl) {
  }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'user-id': '1'
  }

  static accountObj: Account;

  setAccountObj(account) {
    AccountServiceService.accountObj = account
  }

  getAccountObj() {
    return AccountServiceService.accountObj;
  }

  requestOptions = {
    headers: new Headers(this.headerDict),
  };
  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'user-id': '1'});


  // getAccounts(): Observable<any> {
  //   let url = ConfigServiceService.baseUrl+"/user/1/accounts"
  //   // return this.http.get(this.accountsUrl);
  //   return this.http.get(url);

  // }
  getAccountsWithUserId(userId): Observable<any> {
    let url = this.usersURL + userId + '/accounts'
    // return this.http.get(this.accountsUrl);
    return this.http.get(url);

  }

  addAccount(account: Account) {
    const body = JSON.stringify(account);
    console.log(body)
    return this.http.post(this.accountsUrl + '/add', body, AccountServiceService.putHttpRequestOptions);
  }

  public static putHttpRequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  addNewAccount(account: Account) {
    const body = JSON.stringify(account);
    console.log(body)
    this.http.post(this.accountsUrl + '/add', body, AccountServiceService.putHttpRequestOptions)
      .subscribe(data => {
          console.log('POST Request is successful ', data);
          this.router.navigate(['/ob-sandbox/view-users']);
        },
        error => {
          console.log('Error...', error);
        }
      );
  }

  updateAccount(account: Account) {
    const body = JSON.stringify(account);
    console.log(body)
    let id = account.AccountId;
    return this.http.put(`${this.accountsUrl}/${id}`, body, AccountServiceService.putHttpRequestOptions)

  }


  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.accountsUrl}/${id}`, {responseType: 'json'});
  }
}
