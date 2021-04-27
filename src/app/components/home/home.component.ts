import {Component, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {FilesAd} from '../../models/FilesAd';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
  products: Ad[] | undefined;
  f: FilesAd[];
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];

  fileInfos: Observable<FilesAd[]>;

  constructor(private Adservice: AdService, private router: Router, private token: TokenStorageService) {
  }

  File: FilesAd[];

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.Adservice.getAd().subscribe(
      (data) => {
        /* this.products = data;
         this.Adservice.getFiles().subscribe(res => {
             this.retrieveResonse = res as FilesAd[];
             for (let i of this.retrieveResonse) {
               this.base64Data.push(i);
               console.log(i.picByte);
             }
             for (let i of this.base64Data) {
               for(let x of i.picByte){     this.retrievedImage.push('data:image/jpg;base64,' + x);
                 console.log(i);}

             }*/
        this.products = data;
        this.Adservice.getFiles().subscribe(res => {
           this.retrieveResonse = res as FilesAd[];
            for(let i of this.retrieveResonse)
            {this.base64Data.push([i.picByte,i.id]); //console.log(this.retrieveResonse);
              }
            for(let t of this.base64Data)
            {this.retrievedImage.push(['data:image/jpeg;base64,' + t[0],t[1]]);//console.log(this.retrievedImage);
            }}
         );

      }
      ,
          /*    for (let i of this.products) {
            for (let j of i.imgads) {
              for (let c of this.base64Data) {
                if (j.id == c.id) {
                  console.log(i);
                  for (let x of j.picByte) {

                 /*   consNG_CHAR = String.fromCharCode.apply(null, j.picByte);
                    let base64String = btoa(STRING_CHAR);
                    j.picByte = 'data:image/jpg;base64, ' + base64String
                      ;
                    }
                  }
                }
              }
            }*/
            /* x.('data:image/jpeg;base64,' + c.picByte);console.log(i);*/


      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    ;
  }

// tslint:disable-next-line:typedef
  selectAd(id
             :
             number
  ) {
    this.router.navigate(['/ad', id]).then();
  }

}
