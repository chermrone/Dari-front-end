import { Component, OnInit } from '@angular/core';
import {resetpassword} from "../../models/resetpassword";
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {LoginInfo} from "../../auth/login-info";

@Component({
  selector: 'app-ressetpassword',
  templateUrl: './ressetpassword.component.html',
  styleUrls: ['./ressetpassword.component.scss']
})
export class RessetpasswordComponent implements OnInit {
hide = true;
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;
 reset: resetpassword = new resetpassword('', '');
  constructor(private us: UserService) { }

  ngOnInit(): void {
  }
  updatepass(f: NgForm){
    this.reset.token = f.value.token;
    console.log(f.value);
    this.reset.password = f.value.password;
    console.log(this.reset);
    this.us.updatepassword(this.reset).subscribe(data => { console.log(data); },
      error => console.log(error));

}}
