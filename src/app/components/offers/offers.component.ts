import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SubscriptionService} from '../../services/subscription.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from '../../models/subscription';
import {MatTableDataSource} from '@angular/material/table';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {HttpClient} from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // We load  Stripe
  stripePromise = loadStripe(environment.stripe);

  Subscriptionlist: Subscription[] = [];
  subs: Subscription = new Subscription();
  subord: SubscriptionOrder = new SubscriptionOrder();
  displayedColumns: string[] = ['Name', 'Description', 'Duration of the offer', 'Price', 'subscribe'];
  dataSource = new MatTableDataSource(this.Subscriptionlist);

  constructor(private ss: SubscriptionService, private elementRef: ElementRef,
              private dialog: MatDialog, private sos: SubscriptionOrderService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.ss.getAllSubscriptions().subscribe(subscriptions => {
      this.Subscriptionlist = subscriptions;
      this.dataSource.data = this.Subscriptionlist;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public subscribe(subscriptiontype: string) {
    for (let s of this.Subscriptionlist) {
      if (s.subscriptiontype == subscriptiontype) {
        this.subs = s;
        this.subord.subscription = this.subs;
      }
    }
    this.sos.subscribe(this.subord, subscriptiontype).subscribe(data => {
      console.log('success');
    });
  }

  async pay(type: string): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'premium',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/' + type,
    };

    const stripe = await this.stripePromise;
    console.log(payment);
    // this is a normal http calls for a backend api
    this.http
      .post(`${environment.serverURL}${environment.serverUrl}/payment`, payment)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
