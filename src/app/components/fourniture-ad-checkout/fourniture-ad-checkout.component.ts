import { Component, Input, OnInit } from '@angular/core';
import { OrderUser } from 'src/app/models/OrderUser';
import { ShoppingCart } from 'src/app/models/ShoppingCart';
import * as moment from 'moment';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderUserService } from 'src/app/services/order-user.service';

@Component({
  selector: 'app-fourniture-ad-checkout',
  templateUrl: './fourniture-ad-checkout.component.html',
  styleUrls: ['./fourniture-ad-checkout.component.scss']
})
export class FournitureAdCheckoutComponent implements OnInit {

  @Input() shoppingCart: ShoppingCart;
  order : OrderUser;
  showCreditCardForm = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderUserService: OrderUserService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.shoppingCart.subscribe(
      (shoppingCart) =>{
        console.log("data:"+JSON.stringify(shoppingCart))
        this.shoppingCart = shoppingCart
        this.order = new OrderUser()
        this.order.quantity = 1
        this.order.statusOrd = false
        this.order.dateCreated = moment().utc().local().format("YYYY-MM-DD");
        this.order.dateShiped = moment().utc().local().format("YYYY-MM-DD");
        this.order.shoppingCart = this.shoppingCart
        console.log("Order:"+JSON.stringify(this.order))
      }
    )
    
  }
  confirmOrder(): void{
    this.showCreditCardForm = true;
    this.orderUserService.createOrder(this.order).subscribe(
      (data)=>{
        console.log("data:"+data)
        this.order = data;
      }
    )
  }
  checkout(): void{
    this.orderUserService.checkout(this.order);
  }

}
