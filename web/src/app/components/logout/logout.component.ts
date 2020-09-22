import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService:CookieService, router:Router) {
    cookieService.delete("user"); 
    router.navigate(["bejelentkezes"]);
  }

  ngOnInit(): void {
  }

}
