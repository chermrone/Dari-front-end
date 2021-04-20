import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {Observable} from 'rxjs';
import {SubscriptionOrder} from '../models/subscriptionOrder';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOrderService {

  constructor(private http: HttpClient) { }

  getAllSubscription_orders(): Observable<SubscriptionOrder[]>{
    return this.http.get<SubscriptionOrder[]>('http://localhost:8082/dari/subscriptionorder/all');
  }

  // tslint:disable-next-line:typedef
  UpgradePremium(id: number, value: any){
    return this.http.post('http://localhost:8082/dari/subscriptionorder/addpremium/' + `${id}`, value);
  }
}
