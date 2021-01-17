import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {ApiUrl} from '../utilities/api-url';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = this.apiUrl.get() + '/user';

  constructor(private http: HttpClient, public apiUrl: ApiUrl) {
  }


  getUsers(): Observable<any> {
    console.log('...in service getUsers usersUrl ', this.usersUrl)
    // const  headers = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    // const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});


    return this.http.get(this.usersUrl);

  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    let headers = {'content-type': 'application/json'}
    console.log(body)
    // console.log(bodys)
    this.http.post(this.usersUrl + '/add', body, {'headers': headers})
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
        },
        error => {

          console.log('Error...', error);

        }
      );
  }

  addNewUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    let headers = {'content-type': 'application/json'}
    console.log(body)
    // console.log(bodys)
    return this.http.post(this.usersUrl + '/add', body, {'headers': headers})

  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.usersUrl + '/' + id, {responseType: 'json'});
  }

  updateUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    let headers = {'content-type': 'application/json'}
    console.log(body)
    return this.http.put(this.usersUrl, body, {responseType: 'json'});
  }
}
