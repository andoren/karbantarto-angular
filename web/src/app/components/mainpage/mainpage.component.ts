import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import {JobService} from '../../services/job.service';
import { Role } from 'src/app/Models/role.enum';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  inProgressJobs:JobModel[] = [];
  newJobs:JobModel[] = [];
  currentMonthJobs:JobModel[]=[];
  constructor(private authGuard:AuthguardService, private jobService:JobService) {
    this.generateTempData()
   }

  ngOnInit(): void {
  }
  generateTempData():void{
    this.jobService.getInProgressJobs().subscribe((jobs)=>{
   
      this.inProgressJobs = jobs;
    });
    this.jobService.getNewJobs().subscribe((jobs)=>{
     
      this.newJobs = jobs;
    });
    this.jobService.getCurrentMonthDoneJobs().subscribe((jobs)=>{
     
      this.currentMonthJobs = jobs;
    });
  }

}
