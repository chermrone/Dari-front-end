import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {Observable} from 'rxjs';
import {SubscriptionOrder} from '../models/subscriptionOrder';
import {environment} from '../../environments/environment';
import {Subscription} from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOrderService {
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

  getAllSubscription_orders(){
    return this.http.get(`${this.url}dari/subscriptionorder/all`);
  }

  getById(id: number){
    return this.http.get(`${this.url}dari/subscriptionorder/find/` + id);
  }

  // tslint:disable-next-line:typedef
  UpgradePremium(id: number, value: any){
    return this.http.post(`${this.url}dari/subscriptionorder/addpremium/` + `${id}`, value);
  }

  // tslint:disable-next-line:typedef
  deleteSubscriptionorder(id: number){
    return this.http.delete(`${this.url}dari/subscriptionorder/delete/` + id);
  }

  createSubscriptionorder(subscriptionorder: SubscriptionOrder, id: number){
    return this.http.post(`${this.url}dari/subscriptionorder/add` + id, subscriptionorder);
  }

  updateSubscriptionorder(subscriptionorder: SubscriptionOrder){
    return this.http.put(`${this.url}dari/subscriptionorder/update`, subscriptionorder);
  }
}
