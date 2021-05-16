import {Component, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {FilesAd} from '../../models/FilesAd';
import {Observable} from 'rxjs';
import {NotifwebsocketService} from "../../services/notifwebsocket.service";
import {CustomSnackBarComponent} from "../custom-snack-bar/custom-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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




  constructor(private Adservice: AdService, private router: Router, private _snackBar: MatSnackBar, private token: TokenStorageService,public websock: NotifwebsocketService) {
  }
  p: number = 1;
  File: FilesAd[];
  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  /*    this._snackBar.openFromComponent(CustomSnackBarComponent, {
        duration: 10* 2000,
      })*/
    this.Adservice.getAd().subscribe(
      (data) => {
        this.products = data;
        this.Adservice.getFiles().subscribe(res => {
           this.retrieveResonse = res as FilesAd[];
           for (const i of this.retrieveResonse)
            {this.base64Data.push([i.picByte, i.id,i.type]); // console.log(this.retrieveResonse);
              }
           for (const t of this.base64Data)
            {if(t[2]=="image/jpeg")
              this.retrievedImage.push(['data:image/jpeg;base64,' + t[0], t[1]]); // console.log(this.retrievedImage);
            }}
         );},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    ;
  }

// tslint:disable-next-line:typedef
  selectAd(id: number) {
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
