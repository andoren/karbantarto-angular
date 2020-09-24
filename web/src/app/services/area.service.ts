import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from '../Models/AreaModel';
import { SharedDataModule } from '../Models/shared-data.module';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  options:any={};
  constructor(private http:HttpClient, private sharedDate:SharedDataModule, private authGuard:AuthguardService) { }

  getAreaByUserId():Observable<any>{
    return this.http.get<AreaModel[]>(`${this.sharedDate.AREA_BASE_URL}/userId=${this.authGuard.getLoggedInUser().id}`);
  }
  getAllArea():Observable<any>{
    return this.http.get<AreaModel[]>(`${this.sharedDate.AREA_BASE_URL}`,this.getHeaderOption());
  }
  addArea(area:AreaModel):Observable<any>{
    return this.http.post(`${this.sharedDate.AREA_BASE_URL}`,area,this.getHeaderOption());
  }
  modifyArea(area:AreaModel):Observable<any>{
    return this.http.put(`${this.sharedDate.AREA_BASE_URL}`,area,this.getHeaderOption());
  }
  deleteArea(area:AreaModel){
    return this.http.delete(`${this.sharedDate.AREA_BASE_URL}/${area.id}`,this.getHeaderOption());
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
