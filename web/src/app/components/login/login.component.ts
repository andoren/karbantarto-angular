import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
    sanitizer: DomSanitizer,
    private snackBar:SnackBarService
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
        Validators.minLength(8),
        Validators.maxLength(200)
      ])
    });
    if ( this.authGuard.getLoggedInUser()) {
       this.router.navigate([this.returnUrl]);
    }
  }
  onSubmit() {
 
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
       this.authGuard.login(username, password).subscribe(user=>{
         
        this.snackBar.openInformationSnackBar("Sikeres bejelentkezés","Bejelentkezés");
       },error=>{
         if(error.error.status ==401)this.snackBar.openErrorSnackBar("Hibás felhasználónév vagy jelszó!","Bejelentkezés");
         else this.snackBar.openErrorSnackBar(error.message,"Bejelentkezés");
        
       });
      } catch (err) {
       
      }
    } 
  }

}
