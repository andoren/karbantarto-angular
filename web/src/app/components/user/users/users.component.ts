import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/UserModel';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {UserService} from '../../../services/user.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:UserModel[] = [];
  userToModify:UserModel;
  constructor(private userService:UserService,private snackService:SnackBarService, private router:Router) { }
  displayedColumns: string[] = ['username', 'email','fullname', 'role', 'modify','delete'];
  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser():void{
    this.userService.getAllUsers().subscribe((users)=>{
      this.users = users;
    },error=>{
      console.log(error);
    });
  }
  modifyUser(e):void{
    this.userToModify = null;
    setTimeout(() => this.userToModify = e);
    
  }
  userChanged():void{
    this.userToModify = null;
  }
  deleteUser(e):void{

    this.userService.deleteUserById(e.id).subscribe(()=>{
      this.getAllUser();
      this.snackService.openInformationSnackBar(`Sikeresen törölte a "${e.fullname}" nevű felhasználót.`,"Felhasználó");
    },error=>{
        this.snackService.openErrorSnackBar(error.error,"Felhasználó törlése hiba.");
    });
    
  }
}
