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

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AddjobComponent,
    NewjobComponent
    
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
    MatDividerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
