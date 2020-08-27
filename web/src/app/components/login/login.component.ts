import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(router:Router, authguard:AuthguardService) { 
    if(authguard.isLoggedIn)router.navigate([""]);
  }

  ngOnInit(): void {
  }

}
