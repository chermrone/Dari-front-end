import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] | undefined;

  constructor(private productservice: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.productservice.getProduct().subscribe(
      (data) => {
        this.products = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

}
