import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubscriptionOrder} from '../models/subscriptionOrder';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOrderService {
  get premium(): number {
    return this._premium;
  }

  set premium(value: number) {
    this._premium = value;
  }
  get idsubscription(): number {
    return this._idsubscription;
  }

  set idsubscription(value: number) {
    this._idsubscription = value;
  }
  private url = environment.serverURL;
  // tslint:disable-next-line:variable-name
  private _idsubscription = 0;
  private _premium = 0;

  constructor(private http: HttpClient) { }

  public getAllSubscription_orders(){
    return this.http.get(`${this.url}dari/subscriptionorder/all`);
  }

  public getById(id: number){
    return this.http.get(`${this.url}dari/subscriptionorder/find/` + id);
  }

  public getSubscriptionOrdersByUser(id: number) {
    return this.http.get(`${this.url}dari/subscriptionorder/getbyuser/` + id);
  }

  public getSubscriptionOrdersPremiumByUser(id: number) {
    return this.http.get(`${this.url}dari/subscriptionorder/getPremiumByUser/` + id);
  }

  // tslint:disable-next-line:typedef
  public UpgradePremium(id: number, value: any){
    return this.http.post(`${this.url}dari/subscriptionorder/addpremium/` + `${id}`, value);
  }

  // tslint:disable-next-line:typedef
  public deleteSubscriptionorder(id: number){
    return this.http.delete(`${this.url}dari/subscriptionorder/delete/` + id);
  }

  public createSubscriptionorder(subscriptionorder: SubscriptionOrder, id: string, iduser: number){
    return this.http.post(`${this.url}dari/subscriptionorder/addtouser/` + id + '/' + iduser, subscriptionorder);
  }

  public subscribe(subscriptionorder: SubscriptionOrder, id: string){
    return this.http.post(`${this.url}dari/subscriptionorder/add/` + id, subscriptionorder);
  }

  public updateSubscriptionorder(subscriptionorder: SubscriptionOrder){
    console.log(subscriptionorder);
    return this.http.put(`${this.url}dari/subscriptionorder/update`, subscriptionorder);
  }
}
