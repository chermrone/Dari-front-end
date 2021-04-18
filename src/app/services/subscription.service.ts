import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscription} from '../models/subscription';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getAllSubscriptions(): Observable<Subscription[]>{
    return this.http.get<Subscription[]>(`${this.url}dari/subscriptions/all`);
  }

  // tslint:disable-next-line:typedef
  deleteSubscription(id: number){
    return this.http.delete(`${this.url}dari/subscriptions/delete/` + id);
  }
}
