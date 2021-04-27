import {OrderUser} from './OrderUser';
import {DeliveryMan} from './DeliveryMan';


export class Delivery {
  DeliveryId: number;
  place: string;
  status: boolean;
  cost: number;
  date: Date;


  orderUser: OrderUser;
  deliveryMan: DeliveryMan;
}
