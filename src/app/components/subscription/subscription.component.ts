import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from '../../models/subscription';
import {SubscriptionService} from '../../services/subscription.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:variable-name
  subscriptions_list: Subscription[] = [];
  displayedColumns: string[] = ['id', 'description', 'SubscriptionType', 'validity', 'duration', 'price', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.subscriptions_list);

  constructor(private ss: SubscriptionService, private elementRef: ElementRef) {
  }

  /*ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgba(66,66,66,1)';
  }*/


  ngOnInit(): void {
    this.ss.getAllSubscriptions().subscribe((data) => {
        this.subscriptions_list = data;
        console.log(this.subscriptions_list);
        this.dataSource.data = this.subscriptions_list;
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.subscriptions_list;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteSubscription(id: number) {
    this.ss.deleteSubscription(id).subscribe((data) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
);
}

// tslint:disable-next-line:typedef
applyFilter(event: Event)
{
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
