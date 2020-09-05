import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { LoginComponent } from './components/login/login.component';
import { AddjobComponent } from './components/addjob/addjob.component';
import { ModifyjobComponent } from './components/modifyjob/modifyjob.component';
const routes: Routes = [
  { path: '', component: MainpageComponent },
  {path:'bejelentkezes',component:LoginComponent},
  {path:'ujmunka',component:AddjobComponent},
  {path:'munkamodositas/:id',component:ModifyjobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
