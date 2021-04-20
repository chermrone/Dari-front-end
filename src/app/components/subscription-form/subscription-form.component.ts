import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionService} from '../../services/subscription.service';
import {NgForm} from '@angular/forms';
import {Subscription} from '../../models/subscription';
import {SubscriptionOrder} from '../../models/subscriptionOrder';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  hide = true;
  subscription: Subscription = new Subscription();
  type = '';
  constructor(private matdialogref: MatDialogRef<SubscriptionFormComponent>, private ss: SubscriptionService) { }

  ngOnInit(): void {
    if (this.ss.idsubscription != 0){
      this.ss.getSubscriptionById(this.ss.idsubscription).subscribe(data => {
        this.subscription = data as Subscription;
        console.log(this.subscription);
        if (this.subscription.validity){
          this.type = 'true';
        }
        else this.type = 'false';
      });
    }
  }

  onsubmit(f: NgForm) {
    if (this.ss.idsubscription === 0){
      console.log(f.value);
      this.subscription.subscriptionId = f.value.idsubscription;
      this.subscription.subscriptiontype = f.value.subscriptiontype;
      this.subscription.validity = f.value.validity;
      this.subscription.duration = f.value.duration;
      this.subscription.descriptionOffer = f.value.descriptionOffer;
      this.subscription.price = f.value.price;
      this.ss.createSubscription(this.subscription).subscribe(data => console.log(data));
    }
    else{
      console.log(f.value);
      this.subscription.subscriptionId = f.value.idsubscription;
      this.subscription.subscriptiontype = f.value.subscriptiontype;
      this.subscription.validity = f.value.validity;
      this.subscription.duration = f.value.duration;
      this.subscription.descriptionOffer = f.value.descriptionOffer;
      this.subscription.price = f.value.price;
      this.ss.updateSubscription(this.subscription).subscribe(data => console.log(data));
    }
    this.ss.idsubscription = 0;
    this.subscription = new Subscription();
  }

  onclose(){
    this.matdialogref.close();
    this.ss.idsubscription = 0;
    this.subscription = new Subscription();
  }
}
