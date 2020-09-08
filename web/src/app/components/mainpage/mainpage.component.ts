import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import {JobService} from '../../services/job.service';
import { Role } from 'src/app/Models/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  inProgressJobs:JobModel[] = [];
  newJobs:JobModel[] = [];
  currentMonthJobs:JobModel[]=[];
  checkNeededJobs:JobModel[]=[];
  constructor(public authGuard:AuthguardService, private jobService:JobService, private router:Router) {
    this.generateTempData()
   }

  ngOnInit(): void {
  }
  generateTempData():void{
    this.jobService.getInProgressJobs().subscribe((jobs)=>{
   
      this.inProgressJobs = jobs;
    });
    this.getNewJobs();
    this.jobService.getCurrentMonthDoneJobs().subscribe((jobs)=>{
     
      this.currentMonthJobs = jobs;
    });
    this.jobService.getNeedToCheckJobs().subscribe((jobs)=>{
     
      this.checkNeededJobs = jobs;
    });
  }
  addJob(){
  
    this.router.navigate(["ujmunka"]);
  }
  onDeleteJob(job:JobModel){
    console.log("emit catched in mainpage");
    this.jobService.deleteJob(job).subscribe(result=>{
     
      if(result.success == true) this.getNewJobs();
    });
  
  }
  getNewJobs():void{
    this.jobService.getNewJobs().subscribe((jobs)=>{
     
      this.newJobs = jobs;
    });
  }
}
