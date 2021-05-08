import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FournitureAd} from '../models/FournitureAd';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FournitureAdServiceService {
  constructor(private httpclient: HttpClient, private  tokenStorageService: TokenStorageService) { }
  getOtherAll(): Observable<FournitureAd[]>{
    return this.httpclient.get<FournitureAd[]>(environment.baseUrl + 'FournitureAd/Other/' + this.tokenStorageService.getUsername());
  }
  getMyAll(): Observable<FournitureAd[]>{
    return this.httpclient.get<FournitureAd[]>(environment.baseUrl + 'FournitureAd/My/' + this.tokenStorageService.getUsername());
  }
  getAll(): Observable<FournitureAd[]>{
    return this.httpclient.get<FournitureAd[]>(environment.baseUrl + 'FournitureAd/all');
  }
  getAdById(id: number): Observable<FournitureAd>{
    return this.httpclient.get<FournitureAd>(environment.baseUrl + 'FournitureAd/all/' + id);
  }
  postFournitureAd(fournitureAd: FournitureAd): Observable<FournitureAd>{
    return this.httpclient.post<FournitureAd>(environment.baseUrl + 'FournitureAd/add', fournitureAd);
  }
  public deleteAdById(id: number): Observable<any>{
    return this.httpclient.delete( environment.baseUrl  + 'FournitureAd/delete/' + id);
  }

  public updateAd(fournitureAd: FournitureAd): Observable<any>{
    return this.httpclient.put(environment.baseUrl + 'FournitureAd/modif/' + fournitureAd.faID, fournitureAd);
  }
  public uploadFile(file: File , faID: string): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('previewFile', file);
    formData.append('faID', faID);

    const req = new HttpRequest('POST', environment.baseUrl + 'File/upload' , formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }
}
