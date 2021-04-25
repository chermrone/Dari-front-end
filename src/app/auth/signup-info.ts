import {Gender} from '../enumeration/gender.enum';

export class SignupInfo {

  firstName: string;
  lastName: string;
  userName: string;
  age: number;
  phoneNumber: number;
  email: string;
  roles: string[];
  password: string;
  cin: number;
  gender: Gender;

  constructor(firstName: string, lastName: string, userName: string, age: number, phoneNumber: number,
              roles: string[], cin: number, email: string, password: string, gender: Gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.cin = cin;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = ['BUYER'];
    this.gender = Gender.MALE;
    this.gender = Gender.FEMALE;
  }

}
