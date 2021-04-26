import {Component, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {FilesAd} from '../../models/FilesAd';
import {Observable} from 'rxjs';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private Adservice: AdService, private router: Router, private token: TokenStorageService  ) {
   /*  // Open connection with server socket
   let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      stompClient.subscribe('/notification/topic', notifications => {

        // Update notifications attribute with the recent messsage sent from the server
        this.notifications = JSON.parse(notifications.body).ad;
      })
    }); */
  }
  info: any;
  products: Ad[] | undefined;
  f: FilesAd[];
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];
index = 0;
  fileInfos: Observable<FilesAd[]>;
notifications: any[] = [];

  File: FilesAd[];

// tslint:disable-next-line:typedef
  messages = [];

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };


    this.Adservice.getAd().subscribe(
      (data) => {
        this.products = data;
        this.Adservice.getFiles().subscribe(res => {
           this.retrieveResonse = res as FilesAd[];
           for (const i of this.retrieveResonse)
            {this.base64Data.push([i.picByte, i.id]); // console.log(this.retrieveResonse);
           }
           for (const t of this.base64Data)
            {this.retrievedImage.push(['data:image/jpeg;base64,' + t[0], t[1]]); // console.log(this.retrievedImage);
            }}); },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }); }
  selectAd(id
             :
             number
  ) {
    this.router.navigate(['/ad', id]).then();
  }

}
