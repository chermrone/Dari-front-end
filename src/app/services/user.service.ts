import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Subscription} from "../models/subscription";



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

  // tslint:disable-next-line:typedef
  updateUser(user: User){
    return this.http.put(`${this.url}dari/Users/update`, user);
  }

  createUser(user: User){
    return this.http.post(`${this.url}api/auth/signup`, user);
  }
}
