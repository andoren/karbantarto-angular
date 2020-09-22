import { Component } from '@angular/core';
import { AuthguardService } from './services/authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  constructor(private  authGuard:AuthguardService){

  }
  userIsLoggedIn():boolean{
    return this.authGuard.getLoggedInUser() != null;
  }
}
