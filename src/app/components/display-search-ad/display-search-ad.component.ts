import { Component, OnInit } from '@angular/core';
import {Ad} from '../../models/Ad';
import {FilesAd} from '../../models/FilesAd';
import {Observable} from 'rxjs';
import {AdService} from '../../services/ad.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-display-search-ad',
  templateUrl: './display-search-ad.component.html',
  styleUrls: ['./display-search-ad.component.scss']
})
export class DisplaySearchAdComponent implements OnInit {

  constructor(public Adservice: AdService, private router: Router, private token: TokenStorageService) {
  }
  info: any;
  products: Ad[] | undefined;
  f: FilesAd[];
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];

  fileInfos: Observable<FilesAd[]>;
  File: FilesAd[];
  public ii: number;
  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.products = this.Adservice.ads;
    console.log(this.Adservice.ads);
    this.Adservice.getFiles().subscribe(res => {
        this.retrieveResonse = res as FilesAd[];
        for (const i of this.retrieveResonse) {
          this.base64Data.push([i.picByte, i.id]); // console.log(this.retrieveResonse);
        }
        for (const t of this.base64Data) {
          this.retrievedImage.push(['data:image/jpeg;base64,' + t[0], t[1]]); // console.log(this.retrievedImage);
        }
      }
    );
  }

// tslint:disable-next-line:typedef
    selectAd(id: number) {
    this.router.navigate(['/ad', id]);
  }
  AddTofav(adId: number) {console.log(adId); this.ii = adId;
                          this.Adservice.postFav(adId).subscribe(data => console.log('succes'));
  }
}
