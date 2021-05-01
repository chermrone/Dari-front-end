import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ad} from '../models/Ad';
import {Observable} from 'rxjs';
import {FilesAd} from '../models/FilesAd';
import {Typead} from '../enumeration/Typead';
import {TypeBatiment} from '../enumeration/TypeBatiment';

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

  constructor(private http: HttpClient) {
  }
  countfav: number;
  private url = environment.serverURL;


  private _idAd = 0;
  public ads: Ad[];

  /*This is to fetch Ads from database*/
  // tslint:disable-next-line:typedef
  getAdById(id: number){
    return this.http.get(`${this.url}dari/ads/ad/` + id) ; }
  getAd(){
    return this.http.get<Ad[]>(`${this.url}dari/ads/all` );
  }
  getFiles(){
    return this.http.get<FilesAd[]>(`${this.url}dari/imgads/all`);
  }
  public postAd(Ad: Ad){
    return this.http.post(`${this.url}dari/ads/add/ad`, Ad);
  }
  public EstimationPrice(Ad: Ad): Observable<string>{
    return this.http.post(`${this.url}dari/ads/EstimatedPrice`, Ad,
      {responseType: 'text'});

  }

  public EstimationDuration(Ad: Ad): Observable<string>{
    return this.http.post(`${this.url}dari/ads/ad/estimateDuration`, Ad,
      {responseType: 'text'});

  }
  public getLastAd(){
    return this.http.get(`${this.url}dari/ads/ad/lastad`);
  }
  public deleteAdById(id: number){
    return this.http.delete(`${this.url}dari/ads/delete/` + id); }

  public updateAd(Ad: Ad) {
    return this.http.put(`${this.url}dari/ads/update/ad/`, Ad);
  }

  getOwnedAd() {
    return this.http.get<Ad[]>(`${this.url}dari/ads/adowned`);
  }
  getRentAd() {
    return this.http.get<Ad[]>(`${this.url}dari/ads/ad/rent`);
  }
  getSellAd() {
    return this.http.get<Ad[]>(`${this.url}dari/ads/ad/sell`);
  }

  getFav(){
    this.http.get<Ad[]>(`${this.url}dari/ads/fav`).subscribe(data => this.countfav = data.length);
    return this.http.get<Ad[]>(`${this.url}dari/ads/fav`);

  }

  postFav(id: number) {console.log(id + 'fdf');
    return this.http.get(`${this.url}dari/ads/af/favorite/` + id);
  }
  public deleteImgById(id: number){
    return this.http.delete(`http://localhost:8082/dari/imgads/delete/img/` + id); }

  deleteFavAdById(idAd: number) {
    return this.http.delete(`http://localhost:8082/dari/ads/delete/fav/` + idAd)  ;
  }
  SearchCriteria(price: number,  city: string, rooms: number, typeAd: Typead ,
                 typebat: TypeBatiment)
  {console.log(city + '' + typebat);
    if (city != '' && typebat != null)
    {let params = new HttpParams();
      params = params.append('city', city);
      params = params.append('typebat', typebat);
      if (rooms != 0 && rooms != null)
      {params = params.append('rooms', rooms.toString()); }
      if (typeAd == Typead.RENT || Typead.SELL)
      {params = params.append('typeAd', typeAd); }
      if (price != 0 && price != null) {
        params = params.append('price', price.toString());
      }
      console.log(params);

      this.http.get(`http://localhost:8082/dari/ads/getadbycriteria/`,  {
        params,
      }).subscribe(data => {this.ads = data as Ad[]; console.log(data); console.log(this.ads); }  );
      return this.http.get(`http://localhost:8082/dari/ads/getadbycriteria/`,  {
        params,
      }); }
    else {     return this.http.get<Ad[]>(`${this.url}dari/ads/all` ); }

    /*.subscribe(data =>{this.ads=data as Ad[];console.log(data);console.log(this._ads)}  );
     return this.ads;*/
  }


  getAdsBannedByDate(role: number, datefrom: Date, dateto: Date){

    let params = new HttpParams();
    params = params.append('fromDate', datefrom.toString());
    params = params.append('toDate', dateto.toString());
    return this.http.get<Ad[]>(`${this.url}dari/ads/banned/` + role, {
      params
    });

  }
  GetSuggestionAd(id: number){
    return this.http.get(`${this.url}dari/ads/ad/situation/` + id,
      {responseType: 'text'});
  }
  /********************STATISTICS************************/
  public getByedHousesByRegion(region: string) {
    return this.http.get(`${this.url}dari/ads/buyedAdByRegion/` + region);
  }

  public getByedHousesByRegionAndMaxPrice(region: string, maxprice: number) {
    return this.http.get(`${this.url}dari/ads/buyedAdByRegionandMaxPrice/` + region + '/' + maxprice);
  }

  public getByedHousesByRegionAndMinPrice(region: string, minprice: number) {
    return this.http.get(`${this.url}dari/ads/buyedAdByRegionandMinPrice/` + region + '/' + minprice);
  }

  public getByedHousesByRegionAndperiod(region: string, period: number) {
    return this.http.get(`${this.url}dari/ads/buyedAdInPeriod/` + region + '/' + period);
  }

  public getRegionsOrdredByBuyingAdsAsc(){
    return this.http.get(`${this.url}dari/ads/GetRegionsordredbybuyingasc/`);
  }




}
