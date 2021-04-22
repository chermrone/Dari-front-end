import {SubscriptionType} from './subscription-type.enum';
import {SubscriptionOrder} from './subscriptionOrder';

export class Subscription{
  subscriptionId: number;
  descriptionOffer: string;
  price: number;
  subscriptiontype: SubscriptionType;
  validity: boolean;
  duration: number;
  subscriptionOrder: SubscriptionOrder[];
}
