import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementguardGuard implements CanActivate {
  role: string[] = [];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): UrlTree | boolean{
    if (!this.token) {
      return this.router.parseUrl('/success');
    }

    this.role = this.token.getAuthorities();
    for (let r of this.role){
      if (r === 'PREMIUM' || r === 'ADMIN') {
        return  true;
      }
    }
    return this.router.parseUrl('/premium');
  }

  constructor(private token: TokenStorageService, private router: Router) {
  }

}
