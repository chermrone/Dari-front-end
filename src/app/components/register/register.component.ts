import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {SignupInfo } from '../../auth/signup-info';


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

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.username,
      this.form.age,
      this.form.phoneNumber,
      this.form.cin,
      this.form.roles,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
