import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Ad} from "../models/Ad";
import {AdService} from "./ad.service";
@Injectable({
  providedIn: 'root'
})
export class NotifwebsocketService {

  public stompClient;
  public postnotif: boolean;  public rentnotif: boolean;

  public sellnotif: boolean;

  constructor(private adserv:AdService) {
    this.NotificationWebSocketConnection();this.postnotif=false;this.rentnotif=false;
this.sellnotif=false
  }


  NotificationWebSocketConnection() {
    /**
     * Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     */
    const serverUrl = 'http://localhost:8082/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    /**
     * Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     */

  this.stompClient.connect({}, function (frame) {
    that.stompClient.subscribe('/topic/users', (message) => {
      if (message.body) {
        console.log(that.postnotif);
        console.log(message.body);
        that.adserv.getAdById(JSON.parse(message.body)).subscribe(
          data => {
            that.messageNotif.push(data as Ad)
          })
      }
    });
  });
  }

  messageNotif:Ad[] = [];
Ads:Ad[];
  sendNotif(message) {let ad =message as Ad;ad.us=null;
    this.stompClient.send('/app/sendnotif' , {}, JSON.stringify(ad.adId));console.log(JSON.stringify(ad));
  }

  sendNotifSpecificUserRENT() {
    this.stompClient.send('/app/send/notifLeast' , {});
  }

  sendNotifSpecificUserSELL() {
    this.stompClient.send('/app/send/notifLeast/buy' , {});
  }

/*
  Cities:string[]=[];
  citnotif: string;
  citfav: string;
veerifNotifForSpecificUser(){
  this.adserv.getCityFav().subscribe(data=>{this.Cities=data;console.log(this.Cities)
    let i =this.messageNotif.slice(-1); console.log(i)
    for (let ii of i)
    {this.citnotif=ii.city;
      console.log(ii)}
    for(let iii of this.Cities)
      this.citfav=iii;
  });return this.citfav==this.citnotif;
}
*/




}
