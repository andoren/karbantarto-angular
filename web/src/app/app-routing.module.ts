import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { LoginComponent } from './components/login/login.component';
import { AddjobComponent } from './components/addjob/addjob.component';
import { ModifyjobComponent } from './components/modifyjob/modifyjob.component';
import{LoggedinguardGuard} from './guard/loggedinguard.guard'
import {AdminguardGuard} from './guard/adminguard.guard'
const routes: Routes = [
  {path: '', component: MainpageComponent,canActivate: [LoggedinguardGuard] },
  {path:'bejelentkezes',component:LoginComponent},
  {path:'ujmunka',component:AddjobComponent,canActivate: [LoggedinguardGuard]},
  {path:'munkamodositas/:id',component:ModifyjobComponent,canActivate: [LoggedinguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
