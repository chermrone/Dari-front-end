import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsermanagementguardGuard implements CanActivate {
  role: string[] = [];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): UrlTree | boolean{
    this.role = this.token.getAuthorities();
    for (let r of this.role){
      if (r === 'ADMIN') {
        return  true;
      }
    }
    return this.router.parseUrl('/success');
  }

  constructor(private  token: TokenStorageService, private router: Router) {
  }

}
