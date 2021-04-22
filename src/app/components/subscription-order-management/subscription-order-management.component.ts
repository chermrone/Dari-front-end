import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {MatTableDataSource} from '@angular/material/table';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionorderFormComponent} from '../subscriptionorder-form/subscriptionorder-form.component';

@Component({
  selector: 'app-subscription-order-management',
  templateUrl: './subscription-order-management.component.html',
  styleUrls: ['./subscription-order-management.component.scss']
})
export class SubscriptionOrderManagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscriptionOrder_list: SubscriptionOrder[] = [];
  displayedColumns: string[] = ['id', 'payingDate', 'enable', 'nbrOfWin', 'user', 'subscription', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.subscriptionOrder_list);

  constructor(private elementRef: ElementRef, private dialog: MatDialog, private sos: SubscriptionOrderService) { }

  ngOnInit(): void {

    this.sos.getAllSubscription_orders().subscribe((data) => {
      console.log(data);
      this.subscriptionOrder_list = Object.assign(this.subscriptionOrder_list, data);
      this.dataSource.data = this.subscriptionOrder_list;
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

  oncreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SubscriptionorderFormComponent, dialogConfig);
  }

  onEdit(subscriptionorderId: number) {
    this.sos.idsubscription = subscriptionorderId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SubscriptionorderFormComponent, dialogConfig);
  }

  deleteSubscription(subscriptionId: any) {
    this.sos.deleteSubscriptionorder(subscriptionId).subscribe();
  }
}
