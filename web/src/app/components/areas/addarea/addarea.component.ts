import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaModel } from 'src/app/Models/AreaModel';
import { UserModel } from 'src/app/Models/UserModel';
import { AreaService } from 'src/app/services/area.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.css']
})
export class AddareaComponent implements OnInit {
  areaForm: FormGroup;
  users: UserModel[] = [];
  constructor(private areaService:AreaService,private snackService:SnackBarService,private userService: UserService,private formBuilder: FormBuilder) {
    this.areaForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      boss: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllUser();
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

    this.areaService.addArea(area).subscribe(result=>{
      window.location.reload();
      this.snackService.openInformationSnackBar("Sikeresen hozzáadott egy új elhelyezkedést.","Elhelyezkedés.");
    },error =>{
      this.snackService.openErrorSnackBar(error.error.message,"Elhelyezkedés.");
    });
  }
}
