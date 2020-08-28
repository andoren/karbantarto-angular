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
@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
