import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { JobModel } from 'src/app/Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.css']
})
export class NewjobComponent implements OnInit {

  @Input() job:JobModel

  constructor(public authGuard:AuthguardService) {
    
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
  
}
