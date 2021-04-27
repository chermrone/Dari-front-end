import {User} from './user';
import {FournitureAd} from './FournitureAd';
import {OrderUser} from './OrderUser';


export class ShoppingCart {
  ShoppingCartId: number;
  Quantity: number;
  dateadded: Date;
  address: string;

  fournitureAds: FournitureAd[];
  us: User;
  orderUser: OrderUser;
}
