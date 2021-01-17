import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup } from '../model/lookup';
import { ApiUrl } from '../utilities/api-url';

@Injectable({
  providedIn: 'root'
})
export class LookupConfigService {

  public static putHttpRequestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public apiBaseURL = this.apiUrl.get() + '/';

  constructor(private http: HttpClient, public apiUrl: ApiUrl) {

  }

  getLookup(lookupName): Observable<any> {
    const url = this.apiBaseURL + lookupName;
    return this.http.get(url);
  }
  saveLookup(lookup: Lookup, lookupName) {
    const body = JSON.stringify(lookup);
    console.log(body)
    return this.http.post(this.apiBaseURL + lookupName, body, LookupConfigService.putHttpRequestOptions);
  }

  deleteLookup(lookUpAPIName: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseURL}${lookUpAPIName}/${id}`, { responseType: 'json' });
  }
}
