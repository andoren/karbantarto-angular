import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { BehaviorSubject, Observable } from 'rxjs';
import {Role}from '../Models/role.enum';
import { JobModel } from '../Models/JobModel';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import{SharedDataModule} from '../Models/shared-data.module';
import { map } from 'rxjs/operators';
import { SnackBarService } from './snack-bar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
 
  options = {};
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private cookieService:CookieService,private http:HttpClient, private sharedData:SharedDataModule, private snackBar:SnackBarService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.getLoggedInUser());
    this.currentUser = this.currentUserSubject.asObservable();
  
   }
   login(username:String,password:String):Observable<UserModel>{
  
    return this.http.post<any>(`${this.sharedData.USER_BASE_URL}/login`,{"username":username,"password":password})
    .pipe(map(loggedInUser => {
        
        if(loggedInUser && loggedInUser.token !== undefined && loggedInUser.token !== null){
        this.cookieService.set("user",JSON.stringify(loggedInUser),1);
        this.currentUserSubject.next(loggedInUser);
    
        return loggedInUser;
        }
    }));
   }
    getLoggedInUser():UserModel{
      try{
        let temp:UserModel = JSON.parse(this.cookieService.get("user"));
        temp.token = temp.token;
        return temp;
        }catch(error){
       
           return null;
        }
   
   }  
   jobIsMine(job:JobModel):boolean{
    return this.getLoggedInUser().id == job.owner.id;
  }
  isUserJanitor():boolean{
    var enumValue : Role = (<any>Role)[this.getLoggedInUser().role];
    return enumValue  == Role.Janitor;
  }
  iStartedTheJob(job:JobModel):boolean{
    return this.getLoggedInUser().id == job.worker.id;
  }
   userIsAdministrator():boolean{
    var enumValue : Role = (<any>Role)[this.getLoggedInUser().role];
    return enumValue  == Role.Admin;
  }

}
