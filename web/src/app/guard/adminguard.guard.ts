import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../Models/role.enum';
import { AuthguardService } from '../services/authguard.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private authGuard:AuthguardService, private snackService:SnackBarService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var enumValue : Role = (<any>Role)[this.authGuard.getLoggedInUser().role];
      if(!(enumValue == Role.Admin)){
        this.snackService.openErrorSnackBar("Önnek nincs jogosultsága ennek az oldalnak a megtekintéséhez.","Not today!");
        this.router.navigate([""]);
        return false;
      }
      else return true;
      
  }
  
}
