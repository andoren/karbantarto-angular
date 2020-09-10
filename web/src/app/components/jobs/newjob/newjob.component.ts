import { Component, OnInit, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { JobModel } from 'src/app/Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.css']
})
export class NewjobComponent implements OnInit {

  @Input() job:JobModel
  @Output() deleteJob:EventEmitter<JobModel> = new EventEmitter<JobModel>();
  @Output() claimIt:EventEmitter<JobModel> = new EventEmitter<JobModel>();
  @Output() jobToBeChecked:EventEmitter<JobModel> = new EventEmitter<JobModel>();
  @Output() jobIsWrong:EventEmitter<JobModel> = new EventEmitter<JobModel>();
  @Output() jobIsDone:EventEmitter<JobModel> = new EventEmitter<JobModel>();
  constructor(public authGuard:AuthguardService, private router:Router) {
    
   }

  ngOnInit(): void {

  }

  isNewJob():boolean{
 
   return !this.job.getWorker();
  }
  inProgressJob():boolean{

    return this.job.getWorker() != null && this.job.getProceedDate() == null;
  }
  checkNeededForTheJob():boolean{
    return this.job.getWorker() && this.job.getProceedDate() != undefined ;
  }
  goToModifyJobPage():void{
    this.router.navigate([`munkamodositas/${this.job.getId()}`]);
  }
  onDeleteJob():void{
    this.deleteJob.emit(this.job);
  }
  onIClaimIt():void{
    this.claimIt.emit(this.job);
  }
  onJobToBeChecked():void{

    this.jobToBeChecked.emit(this.job);
  }
  onJobIsDone():void{
 
    this.jobIsDone.emit(this.job);
  }
  onJobIsWrong():void{
    this.jobIsWrong.emit(this.job);
  }
}
