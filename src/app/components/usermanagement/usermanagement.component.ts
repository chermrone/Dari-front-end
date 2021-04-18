import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {User} from '../../models/user';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    user: User [] = [];
    displayedColumns: string[] = ['idUser', 'firstName', 'lastName', 'username', 'cin', 'phoneNumber', 'isConnected', 'email', 'gender', 'age', 'creationDate', 'userState', 'banDate', 'banNbr', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.user);
  constructor(private us: UserService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.us.getAllUsers().subscribe((data ) => {
        this.user = data;
        console.log(this.user);
        this.dataSource.data = this.user;
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.user;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteUser(id: number){
    this.us.deleteUser(id).subscribe(
      () => window.location.reload());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
