import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SubscriptionService} from '../../services/subscription.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from '../../models/subscription';
import {MatTableDataSource} from '@angular/material/table';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  Subscriptionlist: Subscription[] = [];
  subs: Subscription = new Subscription();
  subord: SubscriptionOrder = new SubscriptionOrder();
  displayedColumns: string[] = ['Name', 'Description', 'Duration of the offer', 'Price', 'subscribe'];
  dataSource = new MatTableDataSource(this.Subscriptionlist);

  constructor(private ss: SubscriptionService, private elementRef: ElementRef, private dialog: MatDialog,private sos: SubscriptionOrderService) { }

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

  subscribe(subscriptiontype: string) {
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
}
