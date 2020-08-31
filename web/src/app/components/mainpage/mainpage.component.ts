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
    this.tempJob.setOwner(new UserModel());
    this.tempJob.setWorker(new UserModel());
    this.tempJob.setCreatedDate(new Date());

    this.jobs.push(this.tempJob);

    this.tempJob = new JobModel();
    this.tempJob.setId(2);
    this.tempJob.setDescription("Elromlott az földszinti 23-as szobábana wc lehúzójának a kiscicájának az izébizéje.");
    this.tempJob.setTitle("Elromlott Földszint WC");
    this.tempJob.setOwner(new UserModel());
    this.tempJob.setWorker(new UserModel());
    this.tempJob.setCreatedDate(new Date());
    this.tempJob.setProceedDate(new Date());
    this.jobs.push(this.tempJob);
  }
}
