import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { BehaviorSubject, Observable } from 'rxjs';
import {Role}from '../Models/role.enum';
import { JobModel } from '../Models/JobModel';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import{SharedDataModule} from '../Models/shared-data.module';
import { map } from 'rxjs/operators';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
 
  options = {};
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private cookieService:CookieService,private http:HttpClient, private sharedData:SharedDataModule) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.getLoggedInUser());
    this.currentUser = this.currentUserSubject.asObservable();
  
   }
   login(username:String,password:String):Observable<UserModel>{
  
    return this.http.post<any>(`${this.sharedData.USER_BASE_URL}/login`,{"username":username,"password":password})
    .pipe(map(loggedInUser => {
        let user:UserModel = new UserModel(loggedInUser.id,loggedInUser.fullName,loggedInUser.role);
        user.setToken(loggedInUser.token);
        if(user.getToken() && user.getToken() !== undefined && user.getToken() !== null){
        this.cookieService.set("user",JSON.stringify(user),1);
        this.currentUserSubject.next(user);
    
        return user;
        }
    }));
   }
    getLoggedInUser():UserModel{
      try{
        let temp = JSON.parse(this.cookieService.get("user"));
        let user:UserModel = new UserModel(temp.id,temp.fullname,temp.role);
        user.setToken(temp.token);
        console.log(user);
        return user;
        }catch(error){
           console.log(error);
           return null;
        }
   
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
