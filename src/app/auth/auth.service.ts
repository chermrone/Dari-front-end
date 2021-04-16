import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import {LoginInfo} from './login-info';
import {SignupInfo} from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8082/api/auth/signin';
  private signupUrl = 'http://localhost:8082/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginInfo): Observable<any> {
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignupInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, httpOptions);
  }
}
