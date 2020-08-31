import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  title:String;
  constructor(private breakpointObserver: BreakpointObserver, private authguard:AuthguardService) {
    this.title = "Karbantartó";

  }
  getUserFullname():String{
 
    return this.authguard.getUser().getFullname();
  }
}
