import { Injectable } from '@angular/core';
import { JobModel } from '../Models/JobModel';
import { UserModel } from '../Models/UserModel';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { of } from "rxjs";
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }
  getNewJobs():Observable<any>{
 
    let jobs:JobModel[] = [];
    let tempJob:JobModel;
    tempJob = new JobModel();
    tempJob.setId(1);
    tempJob.setDescription("Elromlott az Demens 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Demens TV");
    tempJob.setOwner(new UserModel("Körmendi Szilvia"));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(2);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Szenvedély WC");
    tempJob.setOwner(new UserModel("Litauszki János"));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);  
    tempJob = new JobModel();
    tempJob.setId(3);
    tempJob.setDescription("Elromlott az földsznit 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Földszint TV");
    tempJob.setOwner(new UserModel("Stuller Istvánné"));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(4);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel("Litauszki János"));
    tempJob.setCreatedDate(new Date());
    jobs.push(tempJob);  
  return of(jobs).pipe(delay(1000));

}
  getInProgressJobs():Observable<any>{
 
      let jobs:JobModel[] = [];
      let tempJob:JobModel;
      tempJob = new JobModel();
      tempJob.setId(4);
      tempJob.setDescription("Elromlott az Demens 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
      tempJob.setTitle("Elromlott Szenvedély TV");
      tempJob.setOwner(new UserModel("Körmendi Szilvia"));
      tempJob.setWorker(new UserModel("Sárkány János"));
      tempJob.setCreatedDate(new Date());
  
      jobs.push(tempJob);
      tempJob = new JobModel();
      tempJob.setId(5);
      tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
      tempJob.setTitle("Elromlott Szenvedély TV");
      tempJob.setOwner(new UserModel("Litauszki János"));
      tempJob.setWorker(new UserModel("Pekár Mihály"));
      tempJob.setCreatedDate(new Date());
     
      jobs.push(tempJob);  
    return of(jobs).pipe(delay(1000));

  }
  getCurrentMonthDoneJobs():Observable<any>{
 
    let jobs:JobModel[] = [];
    let tempJob:JobModel;
    tempJob = new JobModel();
    tempJob.setId(14);
    tempJob.setDescription("Szerver terem évek óta beázik ezért salétromos lett a fal. Ennek a hibának a kiküszöbölésére van szükség. Utána a szerver terem meszelésére is.");
    tempJob.setTitle("A szerver terem beázás");
    tempJob.setOwner(new UserModel("Pekár Mihály"));
    tempJob.setWorker(new UserModel("id. Pekár Mihály"));
    tempJob.setCreatedDate(new Date());
    tempJob.setDoneDate(new Date());
    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(10);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobában a tv ");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel("Litauszki János"));
    tempJob.setWorker(new UserModel("Sárkány János"));
    tempJob.setCreatedDate(new Date());
    tempJob.setDoneDate(new Date());
    jobs.push(tempJob);  
  return of(jobs).pipe(delay(1000));

}
}
