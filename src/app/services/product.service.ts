import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  /*This is to fetch Ads from database*/
  // tslint:disable-next-line:typedef
  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}dari/ads/all` );
  }

}
