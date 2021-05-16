import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {VerifAuthService} from "../../services/verif-auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAddComponent} from "../user-add/user-add.component";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {Typead} from "../../enumeration/Typead";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../models/Ad";
import {TypeBatiment} from "../../enumeration/TypeBatiment";
import {AdadvancSearchAdminComponent} from "../adadvanc-search-admin/adadvanc-search-admin.component";
import {AdKeySearchComponent} from "../ad-key-search/ad-key-search.component";
import { ShoppingCart } from 'src/app/models/ShoppingCart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {keys=[]; symbol=Typead;cities:string[]=[];
  constructor(public Adservice: AdService,private dialog: MatDialog, private token: TokenStorageService, private router: Router, public sos: SubscriptionOrderService,public verifauth: VerifAuthService ,private shoppingCartService: ShoppingCartService) {
    this.keys = Object.keys(this.symbol);       this.keysBat = Object.keys(this.symbolsBat);
    this.cities=['ariana', 'beja', 'ben arous', 'bizerte', 'gabes', 'gafsa', 'jandouba', 'karawen', 'gasrin', 'gbelli', 'kef', 'mahdia', 'manouba', 'mednine', 'mistir', 'nabeul', 'sfax', 'sidi bouzid', 'siliana', 'sousse', 'tataouine', 'tozeur', 'tunis', 'zaghouan'];


  }
  info: any;
  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  id = 1;
  roles: string[];
  countFav: number; adFav: Ad[];
  symbolsBat = TypeBatiment; keysBat = [];
  cartData: ShoppingCart = null;
  totalCartValue: number = 0;


  // tslint:disable-next-line:typedef
  SigninRouting() {
    this.router.navigate(['signin']);
  }
  authority: string;
  // tslint:disable-next-line:typedef
  SignupRouting() {
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
    this.totalCartValue = 0
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

    this.Adservice.getFav().subscribe((data) => {
      console.log(data);
      this.adFav = data;
      this.countFav = this.adFav.length;
    });
    console.log(this.verifauth.verif);
    this.Adservice.getFav().subscribe(data => console.log(data));

    this.shoppingCartService.shoppingCart.subscribe(
      (data:ShoppingCart) => {
        if (data) {
          this.cartData = data;      
        } else {
          const AuthUsername = sessionStorage.getItem("AuthUsername");
          if (AuthUsername) {
            this.shoppingCartService.getShoppingCartByUsername(AuthUsername).subscribe(
              (data) => {
                this.cartData = data;
                // console.log("data from subscribtion:" +JSON.stringify(data));
              }
            )
          }

        }
      }
    )

  }

  getFilePath(ad): string[] {
    let images: string[] = [];
    const imageExtensions = ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.apng', '.wmf', '.ico', '.jif', '.jfif',  '.svg', '.svgz', '.xbm'];
    if (ad.localFile[0]) {
      ad.localFile.forEach((file) => {
        imageExtensions.forEach((extension) => {
          if (file.path.indexOf(extension) > 0) {
            const startIndex = file.path.indexOf('\assets');
            const endIndex = file.path.length;
            images.push(file.path.substring(startIndex, endIndex));
          }
        });
      });
    }
    // console.log(images);
    return images ;
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
  countfav: any;
  RedirectAddProduct() {
    this.router.navigate(['Ad/Add']);

  }
  RedirectAddFurniture() {
    this.router.navigate(['add/fournitureAd']);

  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  onCreate1() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '100%';

    this.dialog.open(RegisterComponent, dialogConfig);

  }

ads:Ad[];verifmsg:string;
  searchbycriteria(typead: any, typebat: any, price: any, rooms: any,city:any) {
    this.Adservice.SearchCriteria(price,  city, rooms, typead,
      typebat).subscribe( data=>{this.ads=data as Ad[];this.Adservice.ads=this.ads});
    console.log(this.Adservice.ads);
        this.router.navigate(['SearchAd']);
  }

  redirectAdSearchKey() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.dialog.open(AdKeySearchComponent, dialogConfig);
  }
  getTotalCartValue():number{
    this.totalCartValue = 0
    this.cartData.fournitureAds.forEach(
      e => this.totalCartValue+=e.price
    )
    return this.totalCartValue
  }
}
