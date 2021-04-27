import {LocalFile} from './LocalFile';
import {ShoppingCart} from './ShoppingCart';

export class FournitureAd{
  faID: number;
  userName: string;
  nameFa: string;
  price: number;
  description: string;
  address: string;
  created: string;
  available: boolean;

  shoppingCart: ShoppingCart;
  localFile: LocalFile[];
}
