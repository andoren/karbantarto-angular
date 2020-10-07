import { Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/Models/JobModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { JobService } from 'src/app/services/job.service';
import { AreaModel } from 'src/app/Models/AreaModel';
import {AreaService} from '../../services/area.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  options: FormGroup;
  constructor(private jobService:JobService, private areaService:AreaService, private snackBarService:SnackBarService) { }
  newJobTitle:String = "";
  newJobDescription:String = "";
  newJob:JobModel = new JobModel();
  areas:AreaModel[] = [];
  selectedArea:AreaModel;
  titleFormControl = new FormControl(this.newJobTitle, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(100)
  ]);
  descriptionFormControl = new FormControl(this.newJobDescription, [
    Validators.required,
    Validators.minLength(20),
    Validators.maxLength(1000)
  ]);
  areaFormControl = new FormControl(this.selectedArea,[Validators.required]);
  ngOnInit(): void {
    this.areaService.getAreaByUserId().subscribe(areas=>{
      this.areas = areas;
    },error=>{
      this.snackBarService.openErrorSnackBar(error.message,"Area letöltési hiba.");
    });
  }
  addJob():void{
    this.newJob.title = this.titleFormControl.value;
    this.newJob.description = this.descriptionFormControl.value;
    this.newJob.area = new AreaModel();
    Object.assign(this.newJob.area,this.areaFormControl.value);

    this.jobService.addJob(this.newJob);
  }
}
