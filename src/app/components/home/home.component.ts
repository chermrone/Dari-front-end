import {Component, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
  products: Ad[] | undefined;

  constructor(private Adservice: AdService, private router: Router, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.Adservice.getAd().subscribe(
      (data) => {
        this.products = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  selectAd(id: number) {
    this.router.navigate(['/ad', id]).then();
  }

}
