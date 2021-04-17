import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ad} from '../models/Ad';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  /*This is to fetch Ads from database*/
  // tslint:disable-next-line:typedef
  getAd(){
    return this.http.get<Ad[]>(`${this.url}dari/ads/all` );
  }
  public postAd(Ad:Ad){
    return this.http.post(`${this.url}dari/ads/add/ad`,Ad);
  }
}
