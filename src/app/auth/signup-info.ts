export class SignupInfo {

  idUser!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  age!: number;
  phoneNumber!: number;
  email!: string;
  roles!: string[];
  password!: string;
  cin!: number;
  userState!: boolean;
  creationDate!: Date;

  constructor(idUser: number, firstName: string, lastName: string, username: string, age: number, phoneNumber: number,
              roles: string[], cin: number, userState: boolean, email: string, password: string, creationDate: Date) {
    this.idUser = idUser;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.cin = cin;
    this.userState = userState;
    this.creationDate = creationDate;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = ['user'];
  }

}
