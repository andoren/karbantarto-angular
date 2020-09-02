import { Injectable } from '@angular/core';
import { JobModel } from '../Models/JobModel';
import { UserModel } from '../Models/UserModel';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { of } from "rxjs";
import { delay } from 'rxjs/operators';
import { Role } from '../Models/role.enum';
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
    tempJob.setOwner(new UserModel(4,"Körmendi Szilvia",Role.User));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(2);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Szenvedély WC");
    tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);  
    tempJob = new JobModel();
    tempJob.setId(3);
    tempJob.setDescription("Elromlott az földsznit 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Földszint TV");
    tempJob.setOwner(new UserModel(7,"Stuller Istvánné",Role.User));
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(4);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
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
      tempJob.setOwner(new UserModel(4,"Körmendi Szilvia",Role.User));
      tempJob.setWorker(new UserModel(5,"Sárkány János",Role.Janitor));

      tempJob.setCreatedDate(new Date());
  
      jobs.push(tempJob);
      tempJob = new JobModel();
      tempJob.setId(5);
      tempJob.setDescription("Elromlott az 4-es épület 1230-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
      tempJob.setTitle("Elromlott Szenvedély TV");
      tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
      tempJob.setWorker(new UserModel(3,"id.Pekár Mihály",Role.Janitor));
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
    tempJob.setOwner(new UserModel(1,"Pekár Mihály",Role.Admin));
    tempJob.setWorker(new UserModel(3,"id. Pekár Mihály",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());
    tempJob.setDoneDate(new Date());
    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(10);
    tempJob.setDescription("Elromlott az 4-es épület 1230-as szobában a tv ");
    tempJob.setTitle("Elromlott Szenvedély TV");
    tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
    tempJob.setWorker(new UserModel(5,"Sárkány János",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());
    tempJob.setDoneDate(new Date());
    jobs.push(tempJob);  
  return of(jobs).pipe(delay(1000));

}
  getNeedToCheckJobs():Observable<any>{
    let jobs:JobModel[] = [];
    let tempJob:JobModel;
    tempJob = new JobModel();
    tempJob.setId(14);
    tempJob.setDescription("Mitomén terem évek óta beázik ezért salétromos lett a fal. Ennek a hibának a kiküszöbölésére van szükség. Utána a szerver terem meszelésére is.");
    tempJob.setTitle("Mitomén Mitomén Mitomén Mitomén");
    tempJob.setOwner(new UserModel(1,"Pekár Mihály",Role.Admin));
    tempJob.setWorker(new UserModel(3,"id. Pekár Mihály",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);
    tempJob = new JobModel();
    tempJob.setId(10); 
    tempJob.setDescription("Elromlott a MitoménMito ménMitoménMi toménMitoménMitoménM itomén MitoménMitoménMitoménMitomén ");
    tempJob.setTitle("Elromlott Szenvedély Mitomén");
    tempJob.setOwner(new UserModel(6,"Litauszki János",Role.User));
    tempJob.setWorker(new UserModel(5,"Sárkány János",Role.Janitor));
    tempJob.setProceedDate(new Date());
    tempJob.setCreatedDate(new Date());

    jobs.push(tempJob);  
  return of(jobs).pipe(delay(1000));
  }
}
