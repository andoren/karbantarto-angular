import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaModel } from 'src/app/Models/AreaModel';
import { UserModel } from 'src/app/Models/UserModel';
import { AreaService } from 'src/app/services/area.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

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
  newFullname:String="";
  occupiedEmail:boolean = false;
  occupiedUsername:boolean = false;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  constructor(private snackService:SnackBarService,private areaService:AreaService,private formBuilder: FormBuilder, private userService:UserService) {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
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
    this.userForm.controls.username.setErrors(null); 
    this.userForm.controls.password.setErrors(null);
    let newUser:UserModel = new UserModel();
    newUser.fullname = this.userForm.value.fullname;
    newUser.username = this.userForm.value.username;
    newUser.password = this.userForm.value.password;
    newUser.role = this.userForm.value.role;
    newUser.email = this.userForm.value.email;
    newUser.areas = this.choosenAreas;
    this.occupiedEmail = false;
    this.occupiedUsername = false;
    this.userService.adduser(newUser).subscribe(()=>{
      this.snackService.openInformationSnackBar("Sikeresen hozzáadta az új felhasználót.","Felhasználó");
      window.location.reload();
    },error=>{
      if (error.error.includes("felhasználó"))this.userForm.controls.username.setErrors({occupied:true}); 
      else this.userForm.controls.email.setErrors({occupied:true});
      console.log(this.occupiedEmail);
      this.snackService.openErrorSnackBar(error.error,"Hiba");
    });
  }
}
