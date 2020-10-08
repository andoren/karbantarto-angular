import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedDataModule {
  BASE_URL:string = "http://10.5.23.203:5555/api/v1";
  USER_BASE_URL:string = this.BASE_URL+"/user";
  JOB_BASE_URL:string = this.BASE_URL+"/work";
  AREA_BASE_URL:string = this.BASE_URL+"/area";
 }
