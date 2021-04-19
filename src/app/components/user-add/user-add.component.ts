import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  hide = true;
  user: User = new User();
  registerForm: FormGroup;

  constructor(public matdialogref: MatDialogRef<UserAddComponent>, private us: UserService) { }

  ngOnInit(): void {

      this.registerForm = new FormGroup({
        firstName: new FormControl('',[Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        age: new FormControl('', [Validators.required]),
        cin: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8)])
      });
      if (this.us.iduser === 1) {
      this.us.getUserById(this.us.iduser).subscribe( user1 => {
        this.user = user1;
        console.log(this.user);
        console.log(typeof(this.user.firstName));
      });
      this.registerForm.patchValue({firstName: this.user.firstName});
      /*this.registerForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        userName: this.user.userName,
        password: this.user.password,
        age: this.user.age,
        cin: this.user.cin,
        email: this.user.email,
        gender: this.user.gender,
        phoneNumber: this.user.phoneNumber,
      });*/
      console.log(this.registerForm.value);
      /*this.registerForm = new FormGroup({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        userName: new FormControl(this.user.userName, [Validators.required]),
        password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
        age: new FormControl(this.user.age, [Validators.required]),
        cin: new FormControl(this.user.cin, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        gender: new FormControl(this.user.gender, [Validators.required]),
        phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(8)])
      });*/
    }
  }

  // tslint:disable-next-line:typedef
  onsubmit(){
    console.log(this.registerForm);
  }

  // tslint:disable-next-line:typedef
  onCancel() {
    this.matdialogref.close();
  }
}
