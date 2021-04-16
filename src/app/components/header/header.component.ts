import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  info: any;
  constructor(private token: TokenStorageService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  SigninRouting(){
    this.router.navigate(['signin']);
  }

  // tslint:disable-next-line:typedef
  SignupRouting(){
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
