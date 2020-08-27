import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loggedIn:boolean = true;
  constructor(router:Router) { 
    if(this.loggedIn)router.navigate([""]);
  }

  ngOnInit(): void {
  }

}
