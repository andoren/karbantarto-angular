import { Component, OnInit } from '@angular/core';
import {JobModel} from '../../Models/JobModel';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  jobs:JobModel[] = [];
  tempJob:JobModel;
  constructor() {
      this.tempJob = new JobModel();
      this.tempJob.setId(1);
      this.jobs.push(this.tempJob);
   }

  ngOnInit(): void {
  }

}
