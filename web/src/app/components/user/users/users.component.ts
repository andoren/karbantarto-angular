import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/UserModel';
import {UserService} from '../../../services/user.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:UserModel[] = [];
  constructor(private userService:UserService) { }
  displayedColumns: string[] = ['id', 'username', 'fullname', 'role'];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users)=>{
      this.users = users;
    },error=>{
      console.log(error);
    });
  }
  
}
