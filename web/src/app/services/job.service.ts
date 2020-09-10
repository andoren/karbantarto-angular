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
@Injectable({
  providedIn: 'root'
})
export class JobService {
  newJobs:JobModel[]=[];
  inProgressJobs:JobModel[]=[];
  unCheckedJobs:JobModel[] = [];
  currentMonthJobs:JobModel[] = [];
  constructor(private authGuard:AuthguardService,private router:Router) { 
    console.log("JobService created! ");
  }
  newJobid:number = 0;
  getNewJobs():Observable<JobModel[]>{
    let tempJob:JobModel;
    tempJob = new JobModel();

    tempJob.setId(4);
    tempJob.setDescription("Elromlott az Demens 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel(4,"Körmendi Szilvia",Role.User));


    tempJob.setCreatedDate(new Date());

    this.newJobs.push(tempJob);
  return of(this.newJobs).pipe(delay(100));

  }
  getInProgressJobs():Observable<JobModel[]>{
 
      let tempJob:JobModel;
      tempJob = new JobModel();
      tempJob.setId(4);
      tempJob.setDescription("Elromlott az Demens 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
      tempJob.setTitle("Elromlott Szenvedély TV");
      tempJob.setOwner(new UserModel(4,"Körmendi Szilvia",Role.User));
      tempJob.setWorker(new UserModel(5,"Sárkány János",Role.Janitor));
      tempJob.setCreatedDate(new Date());
      this.inProgressJobs.push(tempJob);
     
    return of(this.inProgressJobs).pipe(delay(100));

  }
  getCurrentMonthDoneJobs():Observable<any>{
 
    let tempJob:JobModel;
    tempJob = new JobModel();
    tempJob.setId(10);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobában a tv ");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
    tempJob.setWorker(new UserModel(5,"Sárkány János",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());
    tempJob.setDoneDate(new Date());
    this.currentMonthJobs.push(tempJob);  
  return of(this.currentMonthJobs).pipe(delay(100));

}
  getNeedToCheckJobs():Observable<any>{
    let tempJob:JobModel;
    tempJob = new JobModel();
    tempJob.setId(14);
    tempJob.setDescription("Mitomén terem évek óta beázik ezért salétromos lett a fal. Ennek a hibának a kiküszöbölésére van szükség. Utána a szerver terem meszelésére is.");
    tempJob.setTitle("Mitomén Mitomén Mitomén Mitomén");
    tempJob.setOwner(new UserModel(1,"Pekár Mihály",Role.Admin));
    tempJob.setWorker(new UserModel(3,"id. Pekár Mihály",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());
    this.unCheckedJobs.push(tempJob)
  return of(this.unCheckedJobs).pipe(delay(100));
  }
  addJob(job:JobModel):void{
    this.newJobid = this.newJobid + 1;
    job.setId(this.newJobid);
    job.setOwner(this.authGuard.getLoggedInUser());
    job.setCreatedDate(new Date());
    this.newJobs.push(job);
    this.router.navigate([""]);
  }
  getJobById(id:Number):Observable<JobModel>{
    let returnJob:JobModel;
    returnJob = this.newJobs.find(job=>{return job.getId() == id});
    return of(returnJob).pipe(delay(100));
  }
  modifyJob(mJob:JobModel):void{
    this.newJobs = this.newJobs.filter((job)=>{
      return  job.getId() != mJob.getId()
    });

    this.newJobs.push(mJob);
    this.router.navigate([""]);
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
      cJob.setWorker(this.authGuard.getLoggedInUser());
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
      dJob.setProceedDate(new Date());
      this.unCheckedJobs.push(dJob);
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
      dJob.setDoneDate(new Date());
      dJob.setIsDone(true);
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
      dJob.setWorker(null);
      dJob.setProceedDate(null);
      this.newJobs.push(dJob);

    } 
    else {
      return of({success:false}).pipe(delay(100));
    }
    return of({success:true}).pipe(delay(100));
  }
  
}
