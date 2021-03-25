import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthenticationService {

  private localUrl:string;
  constructor(private httpClient:HttpClient) {
    
    this.localUrl="http://localhost:3000/auth/v1/"

  }

  authenticateUser(data):Observable<any> {
    return this.httpClient.post(this.localUrl,data);
  }

  setBearerToken(token) {
    localStorage.setItem('token',token)

  }

  getBearerToken() {
    return localStorage.getItem('token')
  }

  isUserAuthenticated(token): Promise<any> {
    return this.httpClient.post(this.localUrl + 'isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
  }
}
