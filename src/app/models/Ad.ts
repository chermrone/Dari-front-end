import {Typead} from "../enumeration/Typead";
import {TypeBatiment} from '../enumeration/TypeBatiment';
import {FilesAd} from "./FilesAd";


export class Ad {
  adId: number;
  titleAd: string ;
  type: TypeBatiment;
  description: string;
  creationDate: Date;
  sell: boolean;
  BuyingDate: Date ;
  visibility: boolean;
  periodeOfVisibility: Date;
  numbreOfRooms: number;
  price: number ;
  city: string;
  builda: number;
  area: number;
  typead: Typead;
  numberOfBathrooms: number;
  checkInDate: Date ;
  checkOutDate: Date;
  imgads:FilesAd[];

}
