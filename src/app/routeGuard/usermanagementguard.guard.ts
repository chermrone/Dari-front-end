import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsermanagementguardGuard implements CanActivate {
  role: string[] = [];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.role = this.token.getAuthorities();
    for (let r of this.role){
      if (r === 'ADMIN') {
        return  true;
      }
    }
    return false;
  }

  constructor(private  token: TokenStorageService) {
  }

}
