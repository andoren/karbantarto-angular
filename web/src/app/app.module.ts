import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {LoginComponent} from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from './components/footer/footer.component';
import { AddjobComponent } from './components/addjob/addjob.component';
import { NewjobComponent } from './components/jobs/newjob/newjob.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModifyjobComponent } from './components/modifyjob/modifyjob.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthguardService } from './services/authguard.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { LogoutComponent } from './components/logout/logout.component';
import { AdduserComponent } from './components/user/adduser/adduser.component';
import { ModifyuserComponent } from './components/user/modifyuser/modifyuser.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserComponent } from './components/user/users/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AddjobComponent,
    NewjobComponent,
    ModifyjobComponent,
    LogoutComponent,
    AdduserComponent,
    ModifyuserComponent,
    UsersComponent,
    UserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
