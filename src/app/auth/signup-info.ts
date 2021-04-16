export class SignupInfo {

  firstName!: string;
  lastName!: string;
  username!: string;
  age!: number;
  phoneNumber!: number;
  email!: string;
  roles!: string[];
  password!: string;
  cin!: number;

  constructor(firstName: string, lastName: string, username: string, age: number, phoneNumber: number,
              roles: string[], cin: number, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.cin = cin;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = ['BUYER'];
  }

}
