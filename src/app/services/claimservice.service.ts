
import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {claims} from "../models/claims";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ClaimserviceService {
  get clmId(): number {
    return this._clmId;
  }

  set clmId(value: number) {
    this._clmId = value;
  }
  private url = environment.serverURL;
  // tslint:disable-next-line:variable-name
  private _clmId = 0;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
getClaimById(clmId: number){
return this.http.get<claims>(`${this.url}dari/Claims/find/` + clmId);
}
getAllClaims(): Observable<claims[]>{
return this.http.get<claims[]>(`${this.url}dari/Claims/all`);
}
  addclaim(claim: claims){
    return this.http.post(`${this.url}dari/Claims/add`, claim);
  }


  // tslint:disable-next-line:typedef
deleteClaim(clmId: number){
return this.http.delete(`${this.url}dari/Claims/delete/` + clmId);
}

  // tslint:disable-next-line:typedef
updateClaim(claim: claims){
return this.http.put(`${this.url}dari/Claims/update`, claim);
}


}
