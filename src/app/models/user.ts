import {Gender} from './gender.enum';

export class User{
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


  constructor() {
  }
}
