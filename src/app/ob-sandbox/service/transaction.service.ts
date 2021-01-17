import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Account} from '../model/account';
import {Transaction} from '../model/transaction';
import {ApiUrl} from '../utilities/api-url';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  static userId: string;
  static accountId: string;
  static account: Account;

  constructor(private router: Router, private http: HttpClient, public apiUrl: ApiUrl) {
  }

  private transactionssUrl = this.apiUrl.get();


  getTransactionsWithAccountId(accountId): Observable<any> {
    let url = this.transactionssUrl + '/accounts/' + accountId + '/transactions'
    return this.http.get(url);
  }

  saveTransaction(transaction: Transaction) {
    const body = JSON.stringify(transaction);
    console.log(body)
    return this.http.post(this.transactionssUrl + '/transactions/add-transaction', body, TransactionService.putHttpRequestOptions);
  }

  public static putHttpRequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.transactionssUrl}/${'transactions'}/${id}`, {responseType: 'json'});
  }

}
