import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedDataModule {
  BASE_URL:string = "http://192.168.88.13:4200/api/v1";
  USER_BASE_URL:string = this.BASE_URL+"/user";
  JOB_BASE_URL:string = this.BASE_URL+"/work";
  AREA_BASE_URL:string = this.BASE_URL+"/area";
 }
