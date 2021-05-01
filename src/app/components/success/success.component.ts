import { Component, OnInit } from '@angular/core';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();

  constructor(private sos: SubscriptionOrderService) { }

  ngOnInit(): void {
    this.UpgradePremium();
  }

  // tslint:disable-next-line:typedef
  UpgradePremium() {
    this.sos.UpgradePremium(this.sos.premium, this.subscriptionOrder).subscribe(data => {
        this.sos.premium = 0;
      },
      error => console.log(error));
  }

}
