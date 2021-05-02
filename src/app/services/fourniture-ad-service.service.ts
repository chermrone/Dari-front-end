import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FournitureAd} from '../models/FournitureAd';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FournitureAdServiceService {

  constructor(private httpclient: HttpClient, private  tokenStorageService: TokenStorageService) { }

  getAll(): Observable<FournitureAd[]>{
    return this.httpclient.get<FournitureAd[]>(environment.baseUrl + 'FournitureAd/Other/' + this.tokenStorageService.getUsername());
  }
}
