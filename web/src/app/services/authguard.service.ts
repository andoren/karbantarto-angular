import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { BehaviorSubject, Observable } from 'rxjs';
import {Role}from '../Models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  isLoggedIn:boolean = false;
  options = {};
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.getLoggedInUser());
    this.currentUser = this.currentUserSubject.asObservable();
  
   }
   
    getLoggedInUser():UserModel{
     // return new UserModel(1,"Pekár Mihály",Role.Admin);
      // return new UserModel(6,"Litauszki János",Role.User)
     return new UserModel(5,"Sárkány János",Role.Janitor)
   
   }  
}
