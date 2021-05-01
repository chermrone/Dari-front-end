import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAddComponent} from "../user-add/user-add.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;
  u: User;

  // tslint:disable-next-line:max-line-length
  constructor(private us: UserService, private route: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private token: TokenStorageService) { }

  ngOnInit(): void {
   this.username = this.token.getUsername();
   console.log(this.username);
   this.us.getUserByUserName(this.username).subscribe(u1 => {
      this.u = u1;
      console.log(this.u);
    });
  }

  onEdit(userid:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.autoFocus = true;
    this.dialog.open(UserAddComponent, dialogConfig);
    this.us.iduser = userid;
  }

}
