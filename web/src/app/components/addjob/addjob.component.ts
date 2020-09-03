import { Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/Models/JobModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  options: FormGroup;
  constructor(private jobService:JobService) { }
  newJobTitle:String = "";
  newJobDescription:String = "";
  newJob:JobModel = new JobModel();
  titleFormControl = new FormControl(this.newJobTitle, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(100)
  ]);
  descriptionFormControl = new FormControl(this.newJobDescription, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(1000)
  ]);
  ngOnInit(): void {

  }
  addJob():void{
    this.newJob.setTitle(this.titleFormControl.value);
    this.newJob.setDescription(this.descriptionFormControl.value);
      this.jobService.addJob(this.newJob);
  }
}
