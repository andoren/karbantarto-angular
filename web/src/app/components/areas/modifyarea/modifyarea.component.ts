import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaModel } from 'src/app/Models/AreaModel';
import { UserModel } from 'src/app/Models/UserModel';
import { AreaService } from 'src/app/services/area.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifyarea',
  templateUrl: './modifyarea.component.html',
  styleUrls: ['./modifyarea.component.css']
})
export class ModifyareaComponent implements OnInit {
  @Input() area:AreaModel;
  areaForm: FormGroup;
  selected:UserModel;
  users: UserModel[] = [];
  constructor(private areaService:AreaService,private snackService:SnackBarService,private userService: UserService,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    
    this.getAllUser();
    this.areaForm = this.formBuilder.group({
      name: [this.area.name, [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      boss: [this.area.boss, [Validators.required]]
    });

  }
  getAllUser(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }
  submit(): void {
    let area:AreaModel = new AreaModel();
    area.name = this.areaForm.value.name;
    area.boss = this.areaForm.value.boss;
    area.id = this.area.id;
    
   this.areaService.modifyArea(area).subscribe(result=>{
     window.location.reload();
     this.snackService.openInformationSnackBar("Sikeresen hozzáadott egy új elhelyezkedést.","Elhelyezkedés.");
  },error =>{
     this.snackService.openErrorSnackBar(error.error.message,"Elhelyezkedés.");
   });
  }
}
