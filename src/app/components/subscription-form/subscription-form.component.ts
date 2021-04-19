import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionService} from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  constructor(private matdialogref: MatDialogRef<SubscriptionFormComponent>, private ss: SubscriptionService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      descriptionOffer : new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      subscriptiontype: new FormControl('', [Validators.required]),
      validity: new FormControl('',[Validators.required])
    });
  }

  onsubmit() {

  }
}
