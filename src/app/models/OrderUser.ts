import {Delivery} from './Delivery';
import {ShoppingCart} from './ShoppingCart';

export class OrderUser {
  orderId: number;

  dateCreated: Date;

  dateShiped: Date;
  statusOrd: boolean;
  quantity: number;
  stripeOrder: string;

  delivery: Delivery;

  shoppingCart: ShoppingCart;

}
