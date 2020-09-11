import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import {JobService} from '../../services/job.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
  constructor(public authGuard:AuthguardService, private jobService:JobService, private router:Router, private snackService:SnackBarService) {
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

    this.jobService.deleteJob(job).subscribe(result=>{
     
      if(result.success == true){
        this.getNewJobs();
        this.snackService.openInformationSnackBar("Sikeresen törölte a munkát!.","Munka");
      } else{
        this.snackService.openInformationSnackBar("A munkát nem sikerült törölni.","Munka");
      }
    },error=>{
      if(error){
        this.snackService.openErrorSnackBar("A munkát nem sikerült törölni.","Munka");
      }
    });
  
  }
  getNewJobs():void{
    this.jobService.getNewJobs().subscribe((jobs)=>{
     
      this.newJobs = jobs;
    });
  }
  onIClaimIt(job:JobModel):void{
    this.jobService.claimAJob(job).subscribe((result)=>{
        if(result.success){

        }
    });
  }
  onJobToBeChecked(job:JobModel):void{
   
    this.jobService.setJobToBeChecked(job).subscribe((result)=>{
      if(result.success){

      }
  });
  }
  onJobDone(job:JobModel):void{
    this.jobService.setJobDone(job).subscribe((result)=>{

      if(result.success){

      }
    });
  }
  onJobIsWrong(job:JobModel):void{
    this.jobService.setJobWrong(job).subscribe((result)=>{
      if(result.success){

      }
    });
  }
}
