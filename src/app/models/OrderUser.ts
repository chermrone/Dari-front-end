import {Delivery} from './Delivery';
import {ShoppingCart} from './ShoppingCart';

export class OrderUser {
  orderId: number;

  dateCreated: string;

  dateShiped: string;
  statusOrd: boolean;
  quantity: number;
  stripeOrder: string;

  delivery: Delivery;

  shoppingCart: ShoppingCart;

}
