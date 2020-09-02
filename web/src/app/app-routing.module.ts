import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { LoginComponent } from './components/login/login.component';
import { AddjobComponent } from './components/addjob/addjob.component';
const routes: Routes = [
  { path: '', component: MainpageComponent },
  {path:'bejelentkezes',component:LoginComponent},
  {path:'ujmunka',component:AddjobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
