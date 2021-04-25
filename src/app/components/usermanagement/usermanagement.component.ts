import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {User} from '../../models/user';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserAddComponent} from '../user-add/user-add.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    user: User [] = [];
    displayedColumns: string[] = ['idUser', 'firstName', 'lastName', 'username', 'cin', 'phoneNumber', 'connected', 'email', 'gender', 'age', 'creationDate', 'userState', 'banDate', 'banNbr', 'BanUser', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.user);
  constructor(private us: UserService, private elementRef: ElementRef, private dialog: MatDialog) { }

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
    this.us.deleteUser(id).subscribe();
    this.user = [];
    this.dataSource = new MatTableDataSource(this.user);
    window.location.reload();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(UserAddComponent, dialogConfig);
  }

  onEdit(userid:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.autoFocus = true;
    this.dialog.open(UserAddComponent, dialogConfig);
    this.us.iduser = userid;
  }
  onBan(id: number){
    this.us.banUser(id).subscribe(data => { console.log(data); },
    error => console.log(error));
    window.location.reload();
  }

}
