import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {VerifAuthService} from "../../services/verif-auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private token: TokenStorageService, private router: Router, public sos: SubscriptionOrderService,public verifauth: VerifAuthService) {
  }
  info: any;
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  id = 1;
  // tslint:disable-next-line:variable-name
  dropdown_hover = false;
  // tslint:disable-next-line:variable-name
  toggle_collapse = false;
  // tslint:disable-next-line:variable-name
  dropdown_click = false;

  // tslint:disable-next-line:typedef
  SigninRouting(){
    this.router.navigate(['signin']);
  }

  // tslint:disable-next-line:typedef
  SignupRouting(){
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
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
    this.verifauth.verif=false;
    window.location.reload();
  }

  // tslint:disable-next-line:typedef
  UpgradePremium() {
    this.sos.UpgradePremium(this.id, this.subscriptionOrder).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  on_hover(){
    this.dropdown_hover = true;
    console.log(this.dropdown_hover);
  }
  // tslint:disable-next-line:typedef
  mouse_leave(){
    this.dropdown_hover = false;
  }
  // tslint:disable-next-line:typedef
  on_click_toggle(){
    this.toggle_collapse = !this.toggle_collapse;
  }

  // tslint:disable-next-line:typedef
  on_click_dropdown(){
    this.dropdown_click = !this.dropdown_click;
  }

  RedirectAddProduct() {
    this.router.navigate(['Ad/Add']);

  }
}
