import { Component, OnInit } from '@angular/core';
import {Subscription} from '../../models/subscription';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {SubscriptionService} from '../../services/subscription.service';
import {SubscriptionOrderService} from '../../services/subscription-order.service';

@Component({
  selector: 'app-surveillance-de-maison',
  templateUrl: './surveillance-de-maison.component.html',
  styleUrls: ['./surveillance-de-maison.component.scss']
})
export class SurveillanceDeMaisonComponent implements OnInit {
  subs: Subscription = new Subscription();
  subord: SubscriptionOrder = new SubscriptionOrder();

  constructor(private ss: SubscriptionService, private sos: SubscriptionOrderService) { }

  ngOnInit(): void {
    this.ss.getSubscriptionBySubscriptionType('surveillance_de_maison').subscribe( s => {
      this.subs = s as Subscription;
      this.subord.subscription = this.subs;
      this.sos.subscribe(this.subord, 'surveillance_de_maison').subscribe(data => {
        console.log('success');
      });
    });
  }

}
