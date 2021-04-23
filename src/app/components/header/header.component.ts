import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {VerifAuthService} from "../../services/verif-auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAddComponent} from "../user-add/user-add.component";
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private token: TokenStorageService, private router: Router, public sos: SubscriptionOrderService,public verifauth: VerifAuthService) {
  }
  info: any;
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  id = 1;
  roles: string[];
  authority: string;

  // tslint:disable-next-line:typedef
  SigninRouting(){
    this.router.navigate(['signin']);
  }

  // tslint:disable-next-line:typedef
  SignupRouting(){
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'ADMIN';
          return false;
        }
        else if (role === 'LANDLORD') {
          this.authority = 'LANDLORD';
          return false;
        }
        else if (role === 'PREMIUM') {
          this.authority = 'PREMIUM';
          return false;
        }
        this.authority = 'BUYER';
        return true;
      });
    }

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.verifauth.verif);
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.token.signOut();
    this.verifauth.verif = false;
    this.verifauth.verifrole = false;
    this.router.navigate(['']);
  }

  // tslint:disable-next-line:typedef
  UpgradePremium() {
    this.sos.UpgradePremium(this.id, this.subscriptionOrder).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  RedirectAddProduct() {
    this.router.navigate(['Ad/Add']);

  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
