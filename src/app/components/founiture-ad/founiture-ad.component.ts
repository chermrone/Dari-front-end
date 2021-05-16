import {Component, Input, OnInit} from '@angular/core';
import {FournitureAd} from '../../models/FournitureAd';
import {FournitureAdService} from '../../services/fourniture-ad-service.service';
import {FounitureAdDetailsComponent} from '../founiture-ad-details/founiture-ad-details.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-founiture-ad',
  templateUrl: './founiture-ad.component.html',
  styleUrls: ['./founiture-ad.component.scss']
})
export class FounitureAdComponent implements OnInit {
  list: FournitureAd[];
  cities = ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Gouvernorat du Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];
  model = {city:"",price:null,keyword:""}

  // tslint:disable-next-line:max-line-length
  constructor(private fournitureAdService: FournitureAdService, public dialog: MatDialog, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    // console.log(this.tokenStorageService.getUsername());
    if (this.tokenStorageService.getUsername()) {
      this.fournitureAdService.getOtherAll().subscribe(
        (result) => {
          this.list = result;
        }
      );
    } else {
      this.fournitureAdService.getAllAvailable().subscribe(
        (result) => {
          this.list = result;
        }
      );
    }

  }

  openDialog(ad): void {
    const dialogRef = this.dialog.open(FounitureAdDetailsComponent);
    const instance = dialogRef.componentInstance;
    instance.ad = ad;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      instance.vider();
    });
  }
  getFilePath(ad): string[] {
    let images: string[] = [];
    const imageExtensions = ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.apng', '.wmf', '.ico', '.jif', '.jfif',  '.svg', '.svgz', '.xbm'];
    if (ad.localFile[0]) {
      ad.localFile.forEach((file) => {
        imageExtensions.forEach((extension) => {
          if (file.path.indexOf(extension) > 0) {
            const startIndex = file.path.indexOf('\assets');
            const endIndex = file.path.length;
            images.push(file.path.substring(startIndex, endIndex));
          }
        });
      });
    }
    // console.log(images);
    return images ;
  }
  searchbycriteria():void{
    console.log("searchForm:"+this.model.price)
    console.log("searchForm:"+this.model.city)
    console.log("searchForm:"+this.model.keyword)
    this.fournitureAdService.searchByCriteria(this.model).subscribe(
      (searchResults) =>{
        this.list = searchResults
      }
    );
  }
}
