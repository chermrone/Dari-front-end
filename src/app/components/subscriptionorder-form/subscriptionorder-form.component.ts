import {Component, OnInit} from '@angular/core';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {NgForm} from '@angular/forms';
import {SubscriptionService} from '../../services/subscription.service';
import {Subscription} from '../../models/subscription';
import {User} from '../../models/user';

@Component({
  selector: 'app-subscriptionorder-form',
  templateUrl: './subscriptionorder-form.component.html',
  styleUrls: ['./subscriptionorder-form.component.scss']
})
export class SubscriptionorderFormComponent implements OnInit {
  hide = true;
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  subscription: Subscription = new Subscription();
  enbl = '';
  st = '';
  us: User = new User();
  id: number;

  constructor(private matdialogref: MatDialogRef<SubscriptionorderFormComponent>, private sos: SubscriptionOrderService, private ss: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionOrder.subscription = this.subscription;
    if (this.sos.idsubscription != 0){
      this.sos.getById(this.sos.idsubscription).subscribe(data => {
        this.subscriptionOrder = data as SubscriptionOrder;
        this.us = this.subscriptionOrder.us;
        this.id = this.subscriptionOrder.subscriptionOrderId;
        console.log(this.us);
        console.log(data);
        console.log(this.subscriptionOrder);
        if (this.subscriptionOrder.enable){
          this.enbl = 'true';
        }
        else { this.enbl = 'false'; }
      });
    }
  }

  onsubmit(f: NgForm) {
    console.log(this.sos.idsubscription);
    if (this.sos.idsubscription === 0){ // create

      this.subscriptionOrder.enable = f.value.enable;
      this.sos.createSubscriptionorder(this.subscriptionOrder, f.value.subscriptiontype).subscribe(d => {
        console.log(d);
      });
    }
    else {
      this.ss.getSubscriptionBySubscriptionType(f.value.subscriptiontype).subscribe(s => {
        this.subscriptionOrder.subscription = s as Subscription;
        this.subscriptionOrder.us = this.us;
        this.subscriptionOrder.enable = f.value.enable;
        this.subscriptionOrder.subscriptionOrderId = this.id;
        this.sos.updateSubscriptionorder(this.subscriptionOrder).subscribe(d => {
          console.log(d);
        });
      });
    }
    this.sos.idsubscription = 0;
    this.subscriptionOrder = new SubscriptionOrder();
  }

  onclose() {
    this.matdialogref.close();
    this.sos.idsubscription = 0 ;
    this.subscriptionOrder = new SubscriptionOrder();
  }
}
