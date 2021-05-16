import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NotifwebsocketService} from "../../services/notifwebsocket.service";

@Component({
  selector: 'app-notif-admin',
  templateUrl: './notif-admin.component.html',
  styleUrls: ['./notif-admin.component.scss']
})
export class NotifAdminComponent implements OnInit {

  constructor(private dialog: MatDialog,private serviceNotif:NotifwebsocketService) { }

  ngOnInit(): void {
  }

  sendNotifSELLCheapest() {this.serviceNotif.sellnotif=true;
this.serviceNotif.sendNotifSpecificUserSELL()
  }

  sendNotifRENTCheapest() {this.serviceNotif.rentnotif=true;
    this.serviceNotif.sendNotifSpecificUserRENT()

  }
}
