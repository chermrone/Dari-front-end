import { Component, Input, OnInit } from '@angular/core';
import { FournitureAd } from 'src/app/models/FournitureAd';
import { OrderUser } from 'src/app/models/OrderUser';
import { ShoppingCart } from 'src/app/models/ShoppingCart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input()
  shoppingCart:ShoppingCart = null;
  @Input()
  inCheckoutView = false;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    const AuthUsername = sessionStorage.getItem("AuthUsername");
    if(AuthUsername){
      this.shoppingCartService.getShoppingCartByUsername(AuthUsername).subscribe(
        (shoppingcart) =>{
          this.shoppingCart = shoppingcart;
        }
      )
    }    

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
    if(images.length === 0){
      return ["/assets/img/test.png"];
    }
    return images ;
  }

  remove(ad: FournitureAd): void{
    this.shoppingCart.fournitureAds = this.shoppingCart.fournitureAds.filter(
      e => e.faID !== ad.faID
    )
    this.shoppingCartService.updateCart(this.shoppingCart).subscribe(
      (data)=>{
        console.log("item was removed");
      }
    );

  }

}
