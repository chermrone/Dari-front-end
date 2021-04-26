import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {LoginInfo} from '../../auth/login-info';
import {Router} from '@angular/router';
import {VerifAuthService} from '../../services/verif-auth.service';
import {NgForm} from '@angular/forms';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {Subscription} from '../../models/subscription';
import {User} from '../../models/user';
import {HttpRequest} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo = new LoginInfo('', '' );
  hide = true;
 user: User = new User();


  constructor( private authService: AuthService, private us: UserService, private matdialogref: MatDialogRef<LoginComponent>, private tokenStorage: TokenStorageService, private router: Router, private verifauth: VerifAuthService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.isLoginFailed = false;
        this.isLoggedIn = false;
        this.roles = this.tokenStorage.getAuthorities();
        this.verifauth.verif = true;
        console.log(this.verifauth.verif);

        for (const role of this.roles){
          if (role === 'ADMIN') {
            this.verifauth.verifrole = true;
          }
        }

        this.router.navigate(['']);

        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  onclose() {
    this.matdialogref.close();
    this.us.iduser = 0 ;
    this.user = new User();
  }
resetpass(f: NgForm){
    this.loginInfo.username = f.value.username;
    this.loginInfo.password = '';
    this.us.resetpassword(this.loginInfo ).subscribe(data => { console.log(data); },
      error => console.log(error));
    this.matdialogref.close();
    this.us.iduser = 0 ;
    this.user = new User();
}
}

