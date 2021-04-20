import {SubscriptionType} from './subscription-type.enum';

export class Subscription{
  subscriptionId: number;
  descriptionOffer: string;
  price: number;
  subscriptiontype: SubscriptionType;
  validity: boolean;
  duration: number;
}
