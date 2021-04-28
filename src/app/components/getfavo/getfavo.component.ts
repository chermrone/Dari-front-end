import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AdService} from "../../services/ad.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ModifAdComponent} from "../modif-ad/modif-ad.component";
import { Ad } from 'src/app/models/Ad';

@Component({
  selector: 'app-getfavo',
  templateUrl: './getfavo.component.html',
  styleUrls: ['./getfavo.component.scss']
})
export class GetfavoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ad_list:Ad[]=[];
  dataSource= new MatTableDataSource(this.ad_list);
  displayedColumns: string[] = [ 'titleAd', 'type', 'description','numbreOfRooms', 'price', 'city', 'builda', 'area', 'typead', 'numberOfBathrooms','goto', 'Delete'];

  constructor(private adserv : AdService,private dialog: MatDialog,private route:Router) { }

  ngOnInit(): void {
    this.adserv.getFav().subscribe((data ) => {
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
    this.adserv.deleteFavAdById(idAd).subscribe(data => console.log("success"));
    this.ad_list = [];
    this.dataSource = new MatTableDataSource(this.ad_list);
    window.location.reload();
  }

  gotoAd(adId: any) {
    this.route.navigate(['/ad', adId]);

  }
}
