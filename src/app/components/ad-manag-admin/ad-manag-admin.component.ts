import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ad} from "../../models/Ad";
import {AdService} from "../../services/ad.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
  displayedColumns: string[] = ['adId', 'titleAd', 'type', 'description', 'creationDate', 'buyingDate','sell', 'numbreOfRooms', 'price', 'city', 'builda', 'area', 'typead', 'numberOfBathrooms', 'checkInDate', 'checkOutDate'];

  constructor(private adserv :AdService) { }

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

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAd(idAd: any) {

  }
}
