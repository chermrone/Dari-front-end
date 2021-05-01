import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../services/subscription.service';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {Subscription} from '../../models/subscription';
import {SubscriptionOrder} from '../../models/subscriptionOrder';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.scss']
})
export class AssuranceComponent implements OnInit {
  subs: Subscription = new Subscription();
  subord: SubscriptionOrder = new SubscriptionOrder();

  constructor(private ss: SubscriptionService, private sos: SubscriptionOrderService) { }

  ngOnInit(): void {
    this.ss.getSubscriptionBySubscriptionType('assurance').subscribe( s => {
      this.subs = s as Subscription;
      this.subord.subscription = this.subs;
      this.sos.subscribe(this.subord, 'assurance').subscribe(data => {
        console.log('success');
      });
    });
  }

}
