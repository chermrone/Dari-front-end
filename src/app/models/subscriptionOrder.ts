import {User} from './user';
import {Subscription} from './subscription';

export class SubscriptionOrder{

  subscriptionOrderId: number;
  payingDate: Date;
  enable: boolean;
  nbrOfWin: number;
  us: User;
  subscription: Subscription;

  constructor() {
  }
}
