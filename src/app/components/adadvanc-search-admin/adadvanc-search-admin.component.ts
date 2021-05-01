import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdService} from "../../services/ad.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Ad} from "../../models/Ad";

@Component({
  selector: 'app-adadvanc-search-admin',
  templateUrl: './adadvanc-search-admin.component.html',
  styleUrls: ['./adadvanc-search-admin.component.scss']
})
export class AdadvancSearchAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
role='';ToDate: Date;FromDate:Date;
  ad_list:Ad[]=[];
  dataSource= new MatTableDataSource(this.ad_list);
  displayedColumns: string[] = ['adId', 'titleAd', 'type', 'description', 'creationDate', 'buyingDate','sell', 'numbreOfRooms', 'price', 'city', 'builda', 'area', 'typead', 'numberOfBathrooms', 'checkInDate', 'checkOutDate', 'Delete'];
 verif: boolean;

  constructor(private adserv : AdService,private dialog: MatDialog,private route:Router) { }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAd(idAd: number) {
    this.adserv.deleteAdById(idAd).subscribe(data => console.log("success"));
    this.ad_list = [];
    this.dataSource = new MatTableDataSource(this.ad_list);
    window.location.reload();
  }
roleNum:number;
  getBannedAds(role,ToDate,FromDate) {
    this.verif=true;
    if(role=='ADMIN')this.roleNum=1;
    if(role=='LANDLORD') this.roleNum=4;
    if(role=='BUYER') this.roleNum=2;
    if(role=='SELLER') this.roleNum=3;
    if(role=='PREMIUM') this.roleNum=5;
console.log(FromDate)
    this.adserv.getAdsBannedByDate(this.roleNum,ToDate,FromDate).subscribe((data ) => {console.log(this.FromDate);
      console.log(this.ToDate);
        this.ad_list = data;
        console.log(this.ad_list);
        this.dataSource.data = this.ad_list;
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.ad_list;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
