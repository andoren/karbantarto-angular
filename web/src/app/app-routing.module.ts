import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { LoginComponent } from './components/login/login.component';
import { AddjobComponent } from './components/addjob/addjob.component';
import { ModifyjobComponent } from './components/modifyjob/modifyjob.component';
import{LoggedinguardGuard} from './guard/loggedinguard.guard'
import {AdminguardGuard} from './guard/adminguard.guard'
import { LogoutComponent } from './components/logout/logout.component';
import { UsersComponent } from './components/user/users/users.component';
import { ModifyuserComponent } from './components/user/modifyuser/modifyuser.component';
import { AreasComponent } from './components/areas/areas.component';
import { ModifyareaComponent } from './components/areas/modifyarea/modifyarea.component';
const routes: Routes = [
  {path: '', component: MainpageComponent,canActivate: [LoggedinguardGuard] },
  {path:'bejelentkezes',component:LoginComponent},
  {path:'ujmunka',component:AddjobComponent,canActivate: [LoggedinguardGuard]},
  {path:'munkamodositas/:id',component:ModifyjobComponent,canActivate: [LoggedinguardGuard]},
  {path:'kijelentkezes',component:LogoutComponent,canActivate:[LoggedinguardGuard]},
  {path:'felhasznalok',component:UsersComponent,canActivate:[LoggedinguardGuard, AdminguardGuard]},
  {path:'felhasznalomodositas/:id',component:ModifyuserComponent,canActivate:[LoggedinguardGuard, AdminguardGuard]},{path:'elhelyezkedesek',component:AreasComponent,canActivate:[LoggedinguardGuard, AdminguardGuard]},
  {path:'elhelyezkedesekmodositas/:id',component:ModifyareaComponent,canActivate:[LoggedinguardGuard, AdminguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
