import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {LoginInfo} from '../../auth/login-info';
import {Router} from '@angular/router';
import {VerifAuthService} from '../../services/verif-auth.service';
import {WebSocketAPI} from "../../services/webSocketAPI";

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
  private loginInfo!: LoginInfo;
  private notifications: any;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router ,private verifauth: VerifAuthService) {
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
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.verifauth.verif = true;
        console.log(this.verifauth.verif);
         for(let role of this.roles)
         {if (role === 'ADMIN') {
            this.verifauth.verifrole = true;
          }
        }
      //  let stompClient = this.webSocketService.connect();
      /*  stompClient.connect({}, frame => {
          console.log(stompClient);

          // Subscribe to notification topic
          stompClient.subscribe('/topic/notification', notifications => {
            console.log(this.notifications);
            // Update notifications attribute with the recent messsage sent from the server
            this.notifications = JSON.parse(notifications.body);
console.log(this.notifications);
          })
        });*/

        this.router.navigate(['']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
