import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaModel } from 'src/app/Models/AreaModel';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  areas:AreaModel[]=[];
  choosenAreas:AreaModel[] = [];
  choosenArea:AreaModel;
  userForm:FormGroup;
  newUsername:String = "";
  newPassword:String = "";
  newFullname:String=""

  constructor(private areaService:AreaService,private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      fullname: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(50)]],
      username: [null, [Validators.required, Validators.minLength(4),Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      role: [null, [Validators.required]]
    });
    
   }

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
  submit():void{
    console.log(this.userForm);
  }
}
