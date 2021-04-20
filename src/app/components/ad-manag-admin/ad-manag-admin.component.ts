import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ad} from "../../models/Ad";
import {AdService} from "../../services/ad.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SubscriptionFormComponent} from "../subscription-form/subscription-form.component";
import {ModifAdComponent} from "../modif-ad/modif-ad.component";
import {Route, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-ad-manag-admin',
  templateUrl: './ad-manag-admin.component.html',
  styleUrls: ['./ad-manag-admin.component.scss']
})
export class AdManagAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ad_list:Ad[]=[];
  dataSource= new MatTableDataSource(this.ad_list);
  displayedColumns: string[] = ['adId', 'titleAd', 'type', 'description', 'creationDate', 'buyingDate','sell', 'numbreOfRooms', 'price', 'city', 'builda', 'area', 'typead', 'numberOfBathrooms', 'checkInDate', 'checkOutDate', 'Edit', 'Delete'];

  constructor(private adserv :AdService,private dialog: MatDialog,private route:Router) { }

  ngOnInit(): void {
    this.adserv.getAd().subscribe((data ) => {
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
  Ad:Ad;
  onEdit(AdId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    this.dialog.open(ModifAdComponent, dialogConfig);
    this.adserv.idAd= AdId;
  }

  oncreate() {
    this.route.navigate(['Ad/Add']);
  }
}
