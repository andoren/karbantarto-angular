import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { BehaviorSubject, Observable } from 'rxjs';
import {Role}from '../Models/role.enum';
import { JobModel } from '../Models/JobModel';

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
     //return new UserModel(1,"Pekár Mihály",Role.Admin);
      //return new UserModel(6,"Litauszki János",Role.User)
    return new UserModel(5,"Sárkány János",Role.Janitor)
   
   }  
   jobIsMine(job:JobModel):boolean{
    return this.getLoggedInUser().getId() == job.getOwner().getId();
  }
  isUserJanitor():boolean{
    return this.getLoggedInUser().getRole() == Role.Janitor;
  }
  iStartedTheJob(job:JobModel):boolean{
    return this.getLoggedInUser().getId() == job.getWorker().getId();
  }
   userIsAdministrator():boolean{
    return this.getLoggedInUser().getRole() == Role.Admin;
  }

}
