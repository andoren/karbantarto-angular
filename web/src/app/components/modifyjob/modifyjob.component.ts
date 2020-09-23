import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { JobModel } from 'src/app/Models/JobModel';
import { JobService } from 'src/app/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifyjob',
  templateUrl: './modifyjob.component.html',
  styleUrls: ['./modifyjob.component.css']
})
export class ModifyjobComponent implements OnInit {
  titleFormControl:FormControl;
  descriptionFormControl:FormControl;
  options: FormGroup;
 JobTitle:String = "";
  JobDescription:String = "";
  job:JobModel;
  constructor(private jobService:JobService, private route:ActivatedRoute) {

    this.titleFormControl = new FormControl(this.JobTitle, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100)
    ]);
    this.descriptionFormControl = new FormControl(this.JobDescription, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000)
    ]);
    let id:Number;
    id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJobById(id).subscribe((job)=>{
      this.job = job;
      this.titleFormControl.setValue(this.job.title);
      this.descriptionFormControl.setValue(this.job.description);
    });

   }

  ngOnInit(): void {
  }
  modifyJob():void{
    this.job.description = this.descriptionFormControl.value;
    this.job.title = this.titleFormControl.value;
    this.jobService.modifyJob(this.job);
  }
}
