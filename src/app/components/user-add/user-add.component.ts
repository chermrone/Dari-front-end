import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Gender} from "../../models/gender.enum";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  hide = true;
user: User = new User();


  constructor(public matdialogref: MatDialogRef<UserAddComponent>, private us: UserService) { }

  ngOnInit(): void {
      if (this.us.iduser != 0) {
        console.log(this.us.iduser);
        this.us.getUserById(this.us.iduser).subscribe(user1 => {
          this.user = user1;
          console.log(this.user);

        });

      }}
  // tslint:disable-next-line:typedef
  onsubmit(f: NgForm) {
          if (this.us.iduser === 0){
            console.log(f.value);
            this.user.firstName = f.value.firstName;
            this.user.lastName = f.value.lastName;
            this.user.userName = f.value.userName;
            this.user.password = f.value.password;
            this.user.age = f.value.age;
            this.user.phoneNumber = f.value.phoneNumber;
            this.user.email = f.value.phoneNumber;
            this.user.gender = f.value.gender;
            this.us.createUser(this.user).subscribe(data => console.log(data));
          }
          else{
            console.log(f.value);
            this.user.firstName = f.value.firstName;
            this.user.lastName = f.value.lastName;
            this.user.userName = f.value.userName;
            this.user.password = f.value.password;
            this.user.age = f.value.age;
            this.user.phoneNumber = f.value.phoneNumber;
            this.user.email = f.value.phoneNumber;
            this.user.gender = f.value.gender;
            console.log(this.user);
            this.us.updateUser(this.user).subscribe(data => console.log(data));
          }
          this.us.iduser = 0;
          this.user = new User();
        }

  // tslint:disable-next-line:typedef
  onCancel() {
    this.matdialogref.close();
    this.us.iduser = 0;
    this.user = new User();
  }
}
