import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {AdService} from "./services/ad.service";
import {NotifwebsocketService} from "./services/notifwebsocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Template';

  constructor(private Adserv:AdService,public websock: NotifwebsocketService) {
}}
