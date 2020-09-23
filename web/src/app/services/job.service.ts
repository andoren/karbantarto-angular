import { Injectable } from '@angular/core';
import { JobModel } from '../Models/JobModel';
import { UserModel } from '../Models/UserModel';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { of } from "rxjs";
import { delay } from 'rxjs/operators';
import { Role } from '../Models/role.enum';
import { AuthguardService } from './authguard.service';
import { Router } from '@angular/router';
import {SnackBarService} from '../services/snack-bar.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { SharedDataModule } from '../Models/shared-data.module';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  options:any={};


  unCheckedJobs:JobModel[] = [];
  currentMonthJobs:JobModel[] = [];
  constructor(private http:HttpClient,private authGuard:AuthguardService,private router:Router,
    private snackBarService:SnackBarService, private shared:SharedDataModule) { 
  
  }
  newJobid:number = 0;
  getNewJobs():Observable<any>{
    return this.http.get<JobModel[]>(`${this.shared.JOB_BASE_URL}/getnewworks`,this.getHeaderOption());

  }
  getInProgressJobs():Observable<any>{
    return this.http.get<JobModel[]>(`${this.shared.JOB_BASE_URL}/getstartedworks`,this.getHeaderOption());

  }
  getCurrentMonthDoneJobs():Observable<any>{
    return this.http.get<JobModel[]>(`${this.shared.JOB_BASE_URL}/getdoneworks`,this.getHeaderOption());

  }
  getNeedToCheckJobs():Observable<any>{
    return this.http.get<JobModel[]>(`${this.shared.JOB_BASE_URL}/getneedtocheckworks`,this.getHeaderOption());

  }
  addJob(job:JobModel):void{
     this.http.post<JobModel[]>(`${this.shared.JOB_BASE_URL}`,job,this.getHeaderOption()).subscribe(()=>{
      
      this.snackBarService.openInformationSnackBar("A munka sikeresen hozzáadva.","Munka hozzáadása.");
      this.router.navigate([""]);
     },error=>{
       this.snackBarService.openErrorSnackBar(error.message,"Munka hozzáadása.");
     });


  }
  getJobById(id:Number):Observable<any>{
    return this.http.get<JobModel>(`${this.shared.JOB_BASE_URL}/${id}`,this.getHeaderOption());
  }
  modifyJob(mJob:JobModel):void{
    this.http.put(`${this.shared.JOB_BASE_URL}`,mJob,this.getHeaderOption()).subscribe(success=>{
      this.snackBarService.openInformationSnackBar("Sikeresen módosította a munkát.","Módosítási hiba")
    },error=>{
      this.snackBarService.openErrorSnackBar(error,"Módosítási hiba");
    });
  }
  deleteJob(dJob:JobModel):Observable<any>{
      return this.http.delete(`${this.shared.JOB_BASE_URL}/${dJob.id}`,this.getHeaderOption());
  }
  claimAJob(cJob:JobModel):Observable<any>{

    return of({success:true}).pipe(delay(100));
  }
  setJobToBeChecked(dJob:JobModel):Observable<any>{

    return of({success:true}).pipe(delay(100));
  }
  setJobDone(dJob:JobModel):Observable<any>{
    const index: number = this.unCheckedJobs.indexOf(dJob);
    if (index !== -1) {
      this.unCheckedJobs.splice(index, 1);
      dJob.doneDate = new Date();
      dJob.isDone = true;
      this.currentMonthJobs.push(dJob);

    } 
    else {
      return of({success:false}).pipe(delay(100));
    }
    return of({success:true}).pipe(delay(100));
  }
  setJobWrong(dJob:JobModel):Observable<any>{
  
    return of({success:true}).pipe(delay(100));
  }
  getHeaderOption():any{
    return this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${this.authGuard.getLoggedInUser().token}`
      }),
      observe: 'body'
    }
  }
}
