import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ad} from '../models/Ad';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

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
  public EstimationPrice(Ad:Ad): Observable<string>{
    return this.http.post(`${this.url}dari/ads/EstimatedPrice`,Ad,
      {responseType: 'text'});

  }

  public EstimationDuration(Ad:Ad): Observable<string>{
    return this.http.post(`${this.url}dari/ads/ad/estimateDuration`,Ad,
      {responseType: 'text'});

  }
public getLastAd(){
    return this.http.get(`${this.url}dari/ads/ad/lastad`);
}

}
