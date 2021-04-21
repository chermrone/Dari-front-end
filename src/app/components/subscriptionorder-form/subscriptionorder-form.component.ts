import {Component, OnInit} from '@angular/core';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {NgForm} from '@angular/forms';
import {SubscriptionService} from '../../services/subscription.service';
import {Subscription} from '../../models/subscription';
import {SubscriptionType} from '../../models/subscription-type.enum';
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

  constructor(private matdialogref: MatDialogRef<SubscriptionorderFormComponent>, private sos: SubscriptionOrderService, private ss: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionOrder.subscription = this.subscription;
    if (this.sos.idsubscription != 0){
      this.sos.getById(this.sos.idsubscription).subscribe(data => {
        this.subscriptionOrder = data as SubscriptionOrder;
        this.us = this.subscriptionOrder.us;
        console.log(this.us);
        console.log(data);
        console.log(this.subscriptionOrder);
        if (this.subscriptionOrder.enable){
          this.enbl = 'true';
        }
        else this.enbl = 'false';
      });
      /*if (this.subscriptionOrder.subscription.subscriptiontype == SubscriptionType.premium){
        this.st ='premium';
      }
      else if (this.subscriptionOrder.subscription.subscriptiontype == SubscriptionType.assurance){
        this.st = 'assurance';
      }
      else if (this.subscriptionOrder.subscription.subscriptiontype == SubscriptionType.surveillance_de_maison){
        this.st = 'surveillance_de_maison';
      }*/
    }
  }

  onsubmit(f: NgForm) {
    console.log(this.sos.idsubscription);
    if (this.sos.idsubscription === 0){
      const s = {} as SubscriptionOrder;
      console.log(f.value);
      this.ss.getSubscriptionBySubscriptionType(f.value.subscriptiontype).subscribe(s => {
        this.subscriptionOrder.subscription = s as Subscription;
        const returnedtarget: SubscriptionOrder = Object.assign(s, f.value);
        /*this.subscriptionOrder.payingDate = f.value.payingDate.toString();
        this.subscriptionOrder.enable = f.value.enable;*/
        console.log(returnedtarget);
        this.sos.createSubscriptionorder(returnedtarget, this.subscriptionOrder.subscription.subscriptionId).subscribe(d => {
          console.log(d);
        });
      });
    }
    else {
      this.ss.getSubscriptionBySubscriptionType(f.value.subscriptiontype).subscribe(s => {
        this.subscriptionOrder.subscription = s as Subscription;
        this.subscriptionOrder.us = this.us;
        Object.assign(this.subscriptionOrder, f.value);
        this.subscriptionOrder.subscriptionOrderId = this.sos.idsubscription;
        const returnedtarget: SubscriptionOrder = this.subscriptionOrder;
          /*this.subscriptionOrder.payingDate = f.value.payingDate.toString();
          this.subscriptionOrder.enable = f.value.enable;*/
        console.log(returnedtarget);
        this.sos.updateSubscriptionorder(returnedtarget).subscribe(d => {
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
