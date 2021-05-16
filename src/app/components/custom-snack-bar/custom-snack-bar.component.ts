import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdService} from "../../services/ad.service";
import {WebsocketService} from "../../services/websocket.service";
import {Ad} from "../../models/Ad";
import {NotifwebsocketService} from "../../services/notifwebsocket.service";

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

  constructor(private route:Router,public adserv:AdService,private websock: NotifwebsocketService) { }
add:Ad[]=[];
  ngOnInit(): void {
    for (let notif of this.websock.messageNotif)
    {this.add.push(notif);
    }
  }

  cancel() {
this.adserv.VerifCancel=false;
  }

  goto(id) {
    this.route.navigate(["ad/",id])

  }
}
