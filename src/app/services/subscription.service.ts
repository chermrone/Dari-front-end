import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscription} from '../models/subscription';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  get idsubscription(): number {
    return this._idsubscription;
  }

  set idsubscription(value: number) {
    this._idsubscription = value;
  }
  private url = environment.serverURL;
  // tslint:disable-next-line:variable-name
  private _idsubscription = 0;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getSubscriptionById(id){
    return this.http.get(`${this.url}dari/subscriptions/find/` + id);
  }

  getAllSubscriptions(): Observable<Subscription[]>{
    return this.http.get<Subscription[]>(`${this.url}dari/subscriptions/all`);
  }

  // tslint:disable-next-line:typedef
  deleteSubscription(id: number){
    return this.http.delete(`${this.url}dari/subscriptions/delete/` + id);
  }

  // tslint:disable-next-line:typedef
  createSubscription(subscription: Subscription){
    return this.http.post(`${this.url}dari/subscriptions/add`, subscription);
  }

  updateSubscription(subscription: Subscription){
    return this.http.put(`${this.url}dari/subscriptions/update`, subscription);
  }

  getSubscriptionBySubscriptionType(subscriptiontype: string){
    return this.http.get(`http://localhost:8082/dari/subscriptions/findBytype/` + subscriptiontype);
  }
}
