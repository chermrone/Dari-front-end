import { Component, Input, OnInit } from '@angular/core';
import { OrderUser } from 'src/app/models/OrderUser';
import { ShoppingCart } from 'src/app/models/ShoppingCart';
import * as moment from 'moment';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderUserService } from 'src/app/services/order-user.service';
import { CardInfo } from 'src/app/models/CardInfo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fourniture-ad-checkout',
  templateUrl: './fourniture-ad-checkout.component.html',
  styleUrls: ['./fourniture-ad-checkout.component.scss']
})
export class FournitureAdCheckoutComponent implements OnInit {

  @Input() shoppingCart: ShoppingCart;
  order: OrderUser = null;
  showCreditCardForm = false;
  errors = [];
  showSuccess = false;
  model:CardInfo = {number:"",cvc:"",exp_month:"",exp_year:""}
  ip = ""
  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderUserService: OrderUserService,
    private httpclient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpclient.request('GET', "http://ifconfig.me/ip", {responseType:'text'}).subscribe(
            (ip) =>{
                this.ip = ip;
            }
        )
    this.shoppingCartService.shoppingCart.subscribe(
      (shoppingCart) => {
        // console.log("shopping cart:"+JSON.stringify(shoppingCart))
        this.shoppingCart = shoppingCart;
        if (!this.order){
          const order = sessionStorage.getItem('Order');
          if (order){
            this.order = JSON.parse(order);
            this.order.shoppingCart = shoppingCart;
            console.log('order after refresh:' + JSON.stringify(this.order));
          }else{
            this.order = new OrderUser();
            this.order.quantity = 1;
            this.order.statusOrd = false;
            this.order.dateCreated = moment().utc().local().format('YYYY-MM-DD');
            this.order.dateShiped = moment().utc().local().format('YYYY-MM-DD');
            // console.log("shopping cart1:"+JSON.stringify(shoppingCart))
            this.order.shoppingCart = shoppingCart;
            console.log('Order:' + JSON.stringify(this.order));
          }
        }
      }
    );

  }
  confirmOrder(): void{
    this.showCreditCardForm = true;
    if (!this.order.orderId){
      console.log('create order');
      this.order.shoppingCart = this.shoppingCart;
      console.log('Order2:' + JSON.stringify(this.order));
      this.orderUserService.createOrder(this.order).subscribe(
        (data) => {
          console.log('created Order:' + JSON.stringify(data));
          this.order = data;
          sessionStorage.setItem('Order', JSON.stringify(this.order));
        }
      );
    }else{
      console.log('update order');
      this.order.shoppingCart = this.shoppingCart;
      console.log('Order3:' + JSON.stringify(this.order));
      this.orderUserService.updateOrder(this.order).subscribe(
        (data) => {
          console.log('updated Order:' + JSON.stringify(data));
          this.order = data;
          sessionStorage.setItem('Order' , JSON.stringify(this.order));
        }
      );
    }
  }
  completeCheckout(): void{
    this.errors = [];
    this.orderUserService.checkout(this.order.orderId).subscribe(
      (data) =>{
        console.log("checkout result:" +JSON.stringify(data));
        this.orderUserService.charge(this.order.orderId,this.model,this.ip).subscribe(
          (data) =>{
            console.log("charge result:" +JSON.stringify(data));
            this.showSuccess = true
            sessionStorage.removeItem("Order")
            this.shoppingCart = new ShoppingCart()
          },
          (error)=>{
            console.log("Errors:"+JSON.stringify(error))
            this.errors.push(
              error
            )
          }
        );
      },
      (error)=>{
        console.log("Errors:"+JSON.stringify(error))
        this.errors.push(
          error
        )
      }
    )

  }

}
