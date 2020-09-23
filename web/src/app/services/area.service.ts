import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from '../Models/AreaModel';
import { SharedDataModule } from '../Models/shared-data.module';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient, private sharedDate:SharedDataModule, private authGuard:AuthguardService) { }

  getAreaByUserId():Observable<any>{
    return this.http.get<AreaModel[]>(`${this.sharedDate.AREA_BASE_URL}/userId=${this.authGuard.getLoggedInUser().id}`);
  }
  

}
