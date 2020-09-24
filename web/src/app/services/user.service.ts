import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedDataModule } from '../Models/shared-data.module';
import { UserModel } from '../Models/UserModel';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options={};
  constructor(private sharedData:SharedDataModule,private http:HttpClient, private authGuard:AuthguardService) { 

  }

  getAllUsers():Observable<any>{
    return this.http.get<UserModel[]>(`${this.sharedData.USER_BASE_URL}`,this.getHeaderOption());
  }


  getHeaderOption():any{
    return this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${this.authGuard.getLoggedInUser().token}`
      }),
      observe: 'body'
    }
  }
}
