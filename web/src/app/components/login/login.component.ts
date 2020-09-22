import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loginInvalid: boolean;

  private returnUrl: string;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private authGuard:AuthguardService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'build',
      sanitizer.bypassSecurityTrustResourceUrl('assets/build.svg'));
  }

   ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.form = new FormGroup({
      username : new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      password : new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ])
    });
    if ( this.authGuard.isLoggedIn) {
       this.router.navigate([this.returnUrl]);
    }
  }
  async onSubmit() {
    this.loginInvalid = false;
 
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authGuard.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } 
  }

}
