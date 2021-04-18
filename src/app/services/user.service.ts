import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Ad} from '../models/Ad';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.serverURL;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getUserByUserName(username: string){
    return this.http.get<User>(`${this.url}dari/Users/findbyusername/` + username);
  }
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}dari/Users/all`);
  }
  deleteUser(id: number){
    return this.http.delete(`${this.url}dari/Users/delete/` + id);
  }
}
