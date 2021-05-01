import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {SignupInfo } from '../../auth/signup-info';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo!: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: User = new User();

  constructor(private authService: AuthService,private us: UserService, private matdialogref: MatDialogRef<RegisterComponent>) { }

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef
  hide=true;
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.userName,
      this.form.age,
      this.form.phoneNumber,
      this.form.cin,
      this.form.roles,
      this.form.email,
      this.form.password,
      this.form.gender);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = false;
        this.isSignUpFailed = false;
        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  onclose() {
    this.matdialogref.close();
    this.us.iduser = 0 ;
    this.user = new User();
  }
}
