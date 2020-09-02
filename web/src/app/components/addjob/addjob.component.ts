import { Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/Models/JobModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  options: FormGroup;
  constructor() { }
  newJob:JobModel;
  ngOnInit(): void {

  }

}
