import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Subscription} from "../models/subscription";
import {SignupInfo} from "../auth/signup-info";
import {LoginComponent} from "../components/login/login.component";
import {LoginInfo} from "../auth/login-info";
import {resetpassword} from "../models/resetpassword";
import {FilesAd} from "../models/FilesAd";
import {imguser} from "../models/imguser";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  get iduser(): number {
    return this._iduser;
  }

  set iduser(value: number) {
    this._iduser = value;
  }

  private url = environment.serverURL;
  // tslint:disable-next-line:variable-name
  private _iduser = 0;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getUserByUserName(username: string){
    return this.http.get<User>(`${this.url}dari/Users/findbyusername/` + username);
  }
  // tslint:disable-next-line:typedef
  getUserById(iduser: number){
    return this.http.get<User>(`${this.url}dari/Users/find/` + iduser);
  }
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}dari/Users/all`);
  }

  postUser(user: any): Observable<any>{
    return this.http.post(`${this.url}api/auth/signup`, user);
  }
  // tslint:disable-next-line:typedef
  deleteUser(id: number){
    return this.http.delete(`${this.url}dari/Users/delete/` + id);
  }
  banUser(id: number){
    return this.http.put(`${this.url}dari/Users/ban/` + id, {responseType: 'text'});
  }

  // tslint:disable-next-line:typedef
  updateUser(user: SignupInfo){
    return this.http.put(`${this.url}dari/Users/update`, user);
  }

  createUser(user: SignupInfo){
    return this.http.post(`${this.url}api/auth/signup`, user);
  }
  resetpassword(reset: LoginInfo){
    return this.http.post(`${this.url}forgot`, reset);
  }
  updatepassword(pass: resetpassword){
    return this.http.post(`${this.url}reset`, pass);
  }
  getFiles(){
    return this.http.get<imguser[]>(`${this.url}dari/imgusers/all` );
  }
  public getLastUser(){
    return this.http.get(`${this.url}dari/Users/user/lastad`);
  }
}
