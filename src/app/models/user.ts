import {Gender} from './gender.enum';

export class User{
   idUser: number;
  // tslint:disable-next-line:ban-types
   firstName: String;
  // tslint:disable-next-line:ban-types
   lastName: String;
  // tslint:disable-next-line:ban-types
   username: String;
  // tslint:disable-next-line:ban-types
   password: String;
   age: number ;
// @ts-ignore
   gender: Gender;
   phoneNumber: number;
// tslint:disable-next-line:ban-types
   email: String;
   cin: number;
   isConnected: boolean;


  constructor() {
  }
}
