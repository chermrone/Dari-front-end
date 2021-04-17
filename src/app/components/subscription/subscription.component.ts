import { Component, OnInit } from '@angular/core';
import {Subscription} from '../../models/subscription';
import {SubscriptionService} from '../../services/subscription.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ArrayDataSource} from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// tslint:disable-next-line:variable-name
const Element_Data1: Subscription[] = [
  {subscriptionId: 1, descriptionOffer: '1st description', subscriptionType: 'premium', validity: true, duration: 30, price: 300},
  {subscriptionId: 2, descriptionOffer: '2nd description', subscriptionType: 'Assurance', validity: true, duration: 30, price: 300},
  // tslint:disable-next-line:max-line-length
  {subscriptionId: 3, descriptionOffer: '3rd description', subscriptionType: 'Surveillance maison', validity: true, duration: 30, price: 300}
];

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  subscriptions_list: Subscription[];
  displayedColumns: string[] = ['id', 'description', 'SubscriptionType', 'validity', 'duration', 'price'];
  dataSource = ELEMENT_DATA;
  src = Element_Data1;

  constructor(private ss: SubscriptionService) { }

  ngOnInit(): void {
    this.ss.getAllSubscriptions().subscribe((data ) => {
      this.subscriptions_list = data;
      console.log(typeof this.subscriptions_list[1].subscriptionType);
      return this.subscriptions_list;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
