import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../services/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinguardGuard implements CanActivate {
  constructor(private authGuard:AuthguardService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!(this.authGuard.getLoggedInUser())){
        this.router.navigate(["bejelentkezes"]);
        return false;
      }
      else return true;
      
      
  }
  
}
