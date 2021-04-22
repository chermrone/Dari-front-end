import {Typead} from "../enumeration/Typead";
import {TypeBatiment} from '../enumeration/TypeBatiment';

export class Ad {
  adId!: number;
  titleAd: string ;
  type!:TypeBatiment;
  description!: string;
  creationDate: Date | undefined;
  sell: boolean | undefined;
  BuyingDate: Date ;
  visibility: boolean | undefined;
  periodeOfVisibility: Date | undefined;
  numbreOfRooms: number | undefined;
  price: number ;
  city: string | undefined;
  builda: number | undefined;
  area: number | undefined;
  typead: Typead;
  numberOfBathrooms: number | undefined;
  checkInDate: Date ;
  checkOutDate: Date ;
}
