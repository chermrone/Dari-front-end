import {User} from './user';
import {FournitureAd} from './FournitureAd';
import {OrderUser} from './OrderUser';


export class ShoppingCart {
  shoppingCartId: number;
  quantity: number;
  dateadded: Date;
  address: string;

  fournitureAds: FournitureAd[];
  us: User;
  orderUser: OrderUser;
}
