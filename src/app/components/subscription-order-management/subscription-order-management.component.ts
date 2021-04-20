import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-order-management',
  templateUrl: './subscription-order-management.component.html',
  styleUrls: ['./subscription-order-management.component.scss']
})
export class SubscriptionOrderManagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private elementRef: ElementRef, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
