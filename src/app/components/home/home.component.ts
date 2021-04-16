import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
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
  products: Product[] | undefined;

  constructor(private productservice: ProductService, private router: Router, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.productservice.getProduct().subscribe(
      (data) => {
        this.products = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

}
