import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifAuthService {
  get verif(): boolean {
    return this._verif;
  }

  set verif(value: boolean) {
    this._verif = value;
  }
 private _verif=false;

  constructor(){
    this._verif = false;
  }

}
