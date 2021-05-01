import { Component, OnInit } from '@angular/core';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  u: User = new User();

  constructor(private token: TokenStorageService, private us: UserService, private sos: SubscriptionOrderService) { }

  ngOnInit(): void {
    // get the id of user
    this.us.getUserByUserName(this.token.getUsername()).subscribe(user => {
      this.u = user;
      // subscription premium
      this.sos.UpgradePremium(this.u.idUser, this.subscriptionOrder).subscribe(data => {
          this.sos.premium = 0;
        },
        error => console.log(error));
    });
  }

}
