import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FournitureAd} from '../../models/FournitureAd';
import {FournitureAdServiceService} from '../../services/fourniture-ad-service.service';
import {ModifAdComponent} from '../modif-ad/modif-ad.component';
import {ModifFournitureAdComponent} from '../modif-fourniture-ad/modif-fourniture-ad.component';
import {FounitureAdDetailsComponent} from '../founiture-ad-details/founiture-ad-details.component';

@Component({
  selector: 'app-fourniture-ad-owned',
  templateUrl: './fourniture-ad-owned.component.html',
  styleUrls: ['./fourniture-ad-owned.component.scss']
})
export class FournitureAdOwnedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ad_list: FournitureAd[] = [] ;
  dataSource = new MatTableDataSource(this.ad_list);
  displayedColumns: string[] = ['nameFa', 'address', 'price', 'created', 'description' , 'Edit' , 'Delete'];

  constructor(private fournitureAdServiceService: FournitureAdServiceService , private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.fournitureAdServiceService.getMyAll().subscribe((data ) => {
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  oncreate(): void {
    this.route.navigate(['/add/fournitureAd']);
  }
  deleteAd(idAd: number): void{
    this.fournitureAdServiceService.deleteAdById(idAd).subscribe(data => console.log('success'));
    this.ad_list = [];
    this.dataSource = new MatTableDataSource(this.ad_list);
    window.location.reload();
  }
  openDialog(ad): void {
    const dialogRef = this.dialog.open(ModifFournitureAdComponent);
    const instance = dialogRef.componentInstance;
    instance.AD = ad;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.dataSource = new MatTableDataSource(this.ad_list);
      instance.AD = null;
      this.ngOnInit();
    });
  }

}
