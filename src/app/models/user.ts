import {Gender} from '../enumeration/gender.enum';
import {claims} from "./claims";
import {imguser} from "./imguser";

export class User{
  constructor() {
  }
   idUser: number;

   firstName: string;
   lastName: string;
   userName: string;
   password: string;
   age: number ;

   gender: Gender;
   phoneNumber: number;

   email: string;
   cin: number;
   connected: boolean;
   creationDate: Date;
   banDate: Date;
   banNbr: number;
   userSate: boolean;
roles:string[];
claim: claims[];

imguser: imguser[];
}
