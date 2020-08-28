import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  isLoggedIn:boolean = false;
  private _user:UserModel
  constructor() {
    this._user = new UserModel();
    this._user.setFullname("Pekár Mihály"); 
   }
   public getUser():UserModel{
     return this._user;
   }
}
