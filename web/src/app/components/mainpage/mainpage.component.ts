import { Component, OnInit } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import { UserModel } from 'src/app/Models/UserModel';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  jobs:JobModel[] = [];
  tempJob:JobModel;
  constructor(authGuard:AuthguardService) {
    this.generateTempData()
   }

  ngOnInit(): void {
  }
  generateTempData():void{
    this.tempJob = new JobModel();
    this.tempJob.setId(1);
    this.tempJob.setDescription("Elromlott az emeleti 4-es szobábana wc lehúzójának a kiscicájának az izébizéje.");
    this.tempJob.setTitle("Elromlott Emelet WC");
    this.tempJob.setOwner(new UserModel("Kovács Éva"));
    this.tempJob.setCreatedDate(new Date());

    this.jobs.push(this.tempJob);

    this.tempJob = new JobModel();
    this.tempJob.setId(2);
    this.tempJob.setDescription("Elromlott az földszinti 23-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    this.tempJob.setTitle("Elromlott Földszint WC");
    this.tempJob.setOwner(new UserModel("Stuller Istvánné"));
    this.tempJob.setWorker(new UserModel("Pekár Mihály"));
    this.tempJob.setCreatedDate(new Date());
    this.tempJob.setProceedDate(new Date());
    this.jobs.push(this.tempJob);

    this.tempJob = new JobModel();
    this.tempJob.setId(3);
    this.tempJob.setDescription("Elromlott az szenvedély 123-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    this.tempJob.setTitle("Elromlott Szenvedély TV");
    this.tempJob.setOwner(new UserModel("Litauszki János"));
    this.tempJob.setWorker(new UserModel("Sárkány János"));
    this.tempJob.setCreatedDate(new Date());
    this.tempJob.setProceedDate(new Date());
    this.jobs.push(this.tempJob);
  }
  jobIsMine():boolean{
    return false;
  }
  isUserJanitor():boolean{
    return true;
  }
}
