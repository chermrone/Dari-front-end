import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../components/login/login.component';

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(LoginComponent, dialogConfig);
    return this.router.parseUrl('');
  }

  constructor(private  token: TokenStorageService, private router: Router, private dialog: MatDialog) {
  }

}
