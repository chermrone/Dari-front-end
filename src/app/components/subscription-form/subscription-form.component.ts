import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SubscriptionService} from '../../services/subscription.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  hide = true;
  constructor(private matdialogref: MatDialogRef<SubscriptionFormComponent>, private ss: SubscriptionService) { }

  ngOnInit(): void {
  }

  onsubmit(f: NgForm) {
    console.log(f.value);
  }
}
