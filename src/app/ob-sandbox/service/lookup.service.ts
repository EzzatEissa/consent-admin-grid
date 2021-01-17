import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lookup} from '../model/lookup';
import {User} from '../model/user';
import {ApiUrl} from '../utilities/api-url';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  public apiURL = this.apiUrl.get();

  public usersList: User[];
  static accountTypeList: Lookup[];
  static accountSubTypeList: Lookup[];
  static currencyList: Lookup[];
  static statusList: Lookup[];
  static schemeNameList: Lookup[];
  static CreditDebitList: Lookup[];
  static balanceTypeList: Lookup[];
  static addressTypeList: Lookup[];
  static AuthorizationTypeList: Lookup[];
  static mutabilityList: Lookup[];

  constructor(private http: HttpClient, public apiUrl: ApiUrl) {
  }

  getLookups() {
    this.getusersList().subscribe(data => {
      console.log('...in getusersList data= ', data)
      this.usersList = data.Data.User;
    });
    this.getAccountTypes().subscribe(data => {
      console.log('...in getAccountTypes data= ', data)
      LookupService.accountTypeList = data.Data;
    });
    this.getAccountSubTypes().subscribe(data => {
      console.log('...in getAccountSubTypes data= ', data)
      LookupService.accountSubTypeList = data.Data;
    });
    this.getCurrency().subscribe(data => {
      console.log('...in getCurrency data= ', data)
      LookupService.currencyList = data.Data;
    });
    this.getShemeName().subscribe(data => {
      console.log('...in getShemeName data= ', data)
      LookupService.schemeNameList = data.Data;
    });
    this.getStatus().subscribe(data => {
      console.log('...in getStatus data= ', data)
      LookupService.statusList = data.Data;
    });
    this.getCreditDebit().subscribe(data => {
      console.log('...in getCreditDebit data= ', data)
      LookupService.CreditDebitList = data.Data;
    });
    this.getBalanceType().subscribe(data => {
      console.log('...in getBalanceType data= ', data)
      LookupService.balanceTypeList = data.Data;
    });
    this.getAddressType().subscribe(data => {
      console.log('...in getAddressType data= ', data)
      LookupService.addressTypeList = data.Data;
    });
    this.getAuthorizationType().subscribe(data => {
      console.log('...in getAuthorizationType data= ', data)
      LookupService.AuthorizationTypeList = data.Data;
    });
    this.getMutability().subscribe(data => {
      console.log('...in getMutability data= ', data)
      LookupService.mutabilityList = data.Data;
    });

  }

  getusersList(): Observable<any> {
    let url = this.apiURL + '/user'
    return this.http.get(url);
  }

  getAccountTypes(): Observable<any> {
    let url = this.apiURL + '/account_type'
    return this.http.get(url);
  }

  getAccountSubTypes(): Observable<any> {
    let url = this.apiURL + '/account_sub_type'
    return this.http.get(url);
  }

  getCurrency(): Observable<any> {
    let url = this.apiURL + '/currency'
    return this.http.get(url);
  }

  getStatus(): Observable<any> {
    let url = this.apiURL + '/status'
    return this.http.get(url);
  }

  getShemeName(): Observable<any> {
    let url = this.apiURL + '/scheme_name'
    return this.http.get(url);
  }

  getCreditDebit(): Observable<any> {
    let url = this.apiURL + '/credit_depit'
    return this.http.get(url);
  }

  getBalanceType(): Observable<any> {
    let url = this.apiURL + '/balance_type'
    return this.http.get(url);
  }

  getAddressType(): Observable<any> {
    let url = this.apiURL + '/address_type'
    return this.http.get(url);
  }

  getAuthorizationType(): Observable<any> {
    let url = this.apiURL + '/autorization_type'
    return this.http.get(url);
  }

  getMutability(): Observable<any> {
    let url = this.apiURL + '/mutability'
    return this.http.get(url);
  }


}

