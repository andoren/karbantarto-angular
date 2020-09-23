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
  newJobs:JobModel[]=[];
  inProgressJobs:JobModel[]=[];
  unCheckedJobs:JobModel[] = [];
  currentMonthJobs:JobModel[] = [];
  constructor(private http:HttpClient,private authGuard:AuthguardService,private router:Router, private shared:SharedDataModule) { 
   
  }
  newJobid:number = 0;
  getNewJobs():Observable<any>{
    return this.http.get<JobModel[]>(`${this.shared.JOB_BASE_URL}/getnewworks`,this.getHeaderOption());

  }
  getInProgressJobs():Observable<JobModel[]>{
 
      let tempJob:JobModel;

      this.inProgressJobs.push(tempJob);
     
    return of(this.inProgressJobs).pipe(delay(100));

  }
  getCurrentMonthDoneJobs():Observable<any>{
 
    let tempJob:JobModel;
  
    this.currentMonthJobs.push(tempJob);  
  return of(this.currentMonthJobs).pipe(delay(100));

}
  getNeedToCheckJobs():Observable<any>{
    let tempJob:JobModel;

    this.unCheckedJobs.push(tempJob)
  return of(this.unCheckedJobs).pipe(delay(100));
  }
  addJob(job:JobModel):void{
    this.newJobid = this.newJobid + 1;

    this.router.navigate([""]);

  }
  getJobById(id:Number):Observable<JobModel>{
    let returnJob:JobModel;

    return of(returnJob).pipe(delay(100));
  }
  modifyJob(mJob:JobModel):void{

  }
  deleteJob(dJob:JobModel):Observable<any>{
    const index: number = this.newJobs.indexOf(dJob);
    if (index !== -1) {
      this.newJobs.splice(index, 1);
      
    }else{
      return of({success:false}).pipe(delay(100));
    } 
 
    return of({success:true}).pipe(delay(100));
  }
  claimAJob(cJob:JobModel):Observable<any>{
    const index: number = this.newJobs.indexOf(cJob);
    if (index !== -1) {
      this.newJobs.splice(index, 1);
      cJob.worker = this.authGuard.getLoggedInUser();
      this.inProgressJobs.push(cJob);
  
    } 
    else {
      return of({success:false}).pipe(delay(100));
    }
    return of({success:true}).pipe(delay(100));
  }
  setJobToBeChecked(dJob:JobModel):Observable<any>{
    const index: number = this.inProgressJobs.indexOf(dJob);
    if (index !== -1) {
      this.inProgressJobs.splice(index, 1);
      dJob.proceedDate = new Date();
      this.unCheckedJobs.push(dJob);
  ;
    } 
    else {
      return of({success:false}).pipe(delay(100));
    }
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
  
    const index: number = this.unCheckedJobs.indexOf(dJob);
    if (index !== -1) {
      this.unCheckedJobs.splice(index, 1);

      this.newJobs.push(dJob);

    } 
    else {
      return of({success:false}).pipe(delay(100));
    }
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
