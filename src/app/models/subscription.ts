import {SubscriptionType} from './subscription-type.enum';

export interface Subscription{
  subscriptionId: number;
  descriptionOffer: string;
  price: number;
  subscriptiontype: SubscriptionType;
  validity: boolean;
  duration: number;
}
