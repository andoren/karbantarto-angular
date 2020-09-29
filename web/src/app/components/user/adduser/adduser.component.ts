import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaModel } from 'src/app/Models/AreaModel';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  options: FormGroup;
  areas:AreaModel[]=[];
  choosenAreas:AreaModel[] = [];
  choosenArea:AreaModel;

  newUsername:String = "";
  newPassword:String = "";
  newFullname:String=""
  usernameFormControl = new FormControl(this.newUsername,[
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)
  ]);
  fullnameFormControl = new FormControl(this.newFullname,[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(100)
  ]);
  passwordFormControl = new FormControl(this.newPassword,[
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50)
  ]); 
  roleFormControl = new FormControl();
  areaFormControl = new FormControl();
  constructor(private areaService:AreaService) { }

  ngOnInit(): void {
    this.areaService.getAllArea().subscribe((areas)=>{
      this.areas = areas;
    },error=>{
      console.log(error);
    });
  }
  isValidForm():Boolean{
    return false;
  }
  setChoosenArea(e){
    this.choosenArea = e.value;
  }
  addAreaToList():void{
    this.choosenAreas.push(this.choosenArea);
    this.areas = this.areas.filter(a=>a.id != this.choosenArea.id);
    this.choosenArea = null;
    
  }
  removeAreaFromList(area):void{
    this.choosenAreas = this.choosenAreas.filter(a=>a.id != area.id);

    this.areas.push(area)

  }
}
