import { Component, OnInit } from '@angular/core';
import {Ad} from "../../models/Ad";
import {FilesAd} from "../../models/FilesAd";
import {Observable} from "rxjs";
import {AdService} from "../../services/ad.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifwebsocketService} from "../../services/notifwebsocket.service";

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  info: any;  pp: number = 1;
  sellAd: Ad[] | undefined;
  f: FilesAd[];
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];

  fileInfos: Observable<FilesAd[]>;

  constructor(private Adservice: AdService, private router: Router, private token: TokenStorageService,public websock: NotifwebsocketService) {
  }

  File: FilesAd[];

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.Adservice.getSellAd().subscribe(
      (data) => {
        this.sellAd = data;
        this.Adservice.getFiles().subscribe(res => {
          this.retrieveResonse = res as FilesAd[];
          for(let i of this.retrieveResonse)
          {this.base64Data.push([i.picByte,i.id,i.type]); //console.log(this.retrieveResonse);
          }
          for(let t of this.base64Data)
          {if(t[2]=="image/jpeg")
            this.retrievedImage.push(['data:image/jpeg;base64,' + t[0],t[1]]);//console.log(this.retrievedImage);
          }}
        ); },
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
    this.router.navigate(['/ad', id]);
  }
  public ii:number;
  AddTofav(adId: number) {console.log(adId);this.ii=adId;
    this.Adservice.postFav(adId).subscribe(data=> console.log("succes"));
  }

  check(adId: number) {
    this.router.navigate(['/ad', adId]);
  }

}
