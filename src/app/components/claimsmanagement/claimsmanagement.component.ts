import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../../models/user';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {claims} from '../../models/claims';
import {ClaimserviceService} from '../../services/claimservice.service';
import {ClaimsupdateComponent} from '../claimsupdate/claimsupdate.component';


@Component({
  selector: 'app-claimsmanagement',
  templateUrl: './claimsmanagement.component.html',
  styleUrls: ['./claimsmanagement.component.scss']
})
export class ClaimsmanagementComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  claim: claims [] = [];
  displayedColumns: string[] = ['clmId', 'content', 'dateOfClm', 'objectOfClm', 'typeClm', 'ad', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource(this.claim);
  constructor(private cl: ClaimserviceService, private elementRef: ElementRef, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.cl.getAllClaims().subscribe((data ) => {
        this.claim = data;
        console.log(this.claim);
        this.dataSource.data = this.claim;
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.claim;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteClaim(clmId: number){
    this.cl.deleteClaim(clmId).subscribe();
    this.claim = [];
    this.dataSource = new MatTableDataSource(this.claim);
    window.location.reload();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  onEdit(clmId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.autoFocus = true;
    this.dialog.open(ClaimsupdateComponent, dialogConfig);
    this.cl.clmId = clmId;
  }

}
