import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionService} from '../../services/subscription.service';
import {NgForm} from '@angular/forms';
import {Subscription} from '../../models/subscription';

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
    console.log(f.value);
    this.ss.idsubscription = 0;
  }

  onclose(){
    this.matdialogref.close();
    this.ss.idsubscription = 0;
  }
}
