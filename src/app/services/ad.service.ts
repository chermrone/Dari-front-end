import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ad} from '../models/Ad';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {FilesAd} from "../models/FilesAd";

@Injectable({
  providedIn: 'root'
})
export class AdService {
  get idAd(): number {
    return this._idAd;
  }

  set idAd(value: number) {
    this._idAd = value;
  }
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }


  private _idAd = 0;

  /*This is to fetch Ads from database*/
  // tslint:disable-next-line:typedef
  getAdById(id:number){
    return this.http.get(`${this.url}dari/ads/ad/`+id) ; }
  getAd(){
    return this.http.get<Ad[]>(`${this.url}dari/ads/all` );
  }
  getFiles(){
    return this.http.get<FilesAd[]>(`${this.url}dari/imgads/all`);
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
public deleteAdById(id:number){
    return this.http.delete(`${this.url}dari/ads/delete/`+id);}

  public updateAd(Ad: Ad) {
return this.http.put(`${this.url}dari/ads/update/ad/`,Ad);
  }

  getOwnedAd() {
    return this.http.get<Ad[]>(`${this.url}dari/ads/adowned`);
  }

  public deleteImgById(id:number){
    return this.http.delete(`http://localhost:8082/dari/imgads/delete/img/`+id);}

  /********************STATISTICS************************/
  public getByedHousesByRegion(region: string) {
    return this.http.get(`${this.url}dari/ads/buyedAdByRegion/` + region);
  }

  public getRegionsOrdredByBuyingAdsAsc(){
    return this.http.get(`${this.url}dari/ads/GetRegionsordredbybuyingasc/`);
  }

}
