import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import {JobService} from '../../services/job.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  webSocketEndPoint: string = 'http://10.5.23.203:5555/ws';
  topic: string = "/work/reload";
  stompClient: any;
  itWasMe:boolean = false;
  inProgressJobs:JobModel[] = [];
  newJobs:JobModel[] = [];
  currentWeekJobs:JobModel[]=[];
  checkNeededJobs:JobModel[]=[];
  constructor(public authGuard:AuthguardService, private jobService:JobService, private router:Router, private snackService:SnackBarService) {
    
   }

  ngOnInit(): void {
    this.getData();
    this.connectToSocket();
  }

/////////
connectToSocket():void{
  console.log("Initialize WebSocket Connection");
  let ws = new SockJS(this.webSocketEndPoint);
  this.stompClient = Stomp.over(ws);
  const _this = this;
  _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
  }, this.errorCallBack);
}
disconnectFromSocket():void {
  if (this.stompClient !== null) {
      this.stompClient.disconnect();
  }
  console.log("Disconnected");
}
errorCallBack(error):void {
  console.log("errorCallBack -> " + error)
  setTimeout(() => {
      this.connectToSocket();
  }, 5000);
}
onMessageReceived(message) {
  this.getData();   
  if(!this.itWasMe){
 
    this.snackService.openInformationSnackBar(message.body,"Szerver üzenet");
  }
  this.itWasMe = false;
}
/////////
  getData():void{
    this.jobService.getInProgressJobs().subscribe((jobs)=>{
   
      this.inProgressJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a folyamatban lévő munkák lekérése közben.","Lekérés");
    });
    this.getNewJobs();
    this.jobService.getCurrentWeekDoneJobs().subscribe((jobs)=>{
     
      this.currentWeekJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a havi munkák lekérése közben","Munka");
    });
    this.jobService.getNeedToCheckJobs().subscribe((jobs)=>{
     
      this.checkNeededJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a ellenőrizendő munkák letöltése közben.","Munka");
    });
  }
  getNewJobs():void{
    this.jobService.getNewJobs().subscribe((jobs)=>{
      this.newJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba az új munkák lekérése közben.","Lekérés");
    });
  }
  addJob(){
    this.router.navigate(["ujmunka"]);
  }
  onDeleteJob(job:JobModel){
    this.itWasMe = true;
    this.jobService.deleteJob(job).subscribe(result=>{
        this.snackService.openInformationSnackBar("Sikeresen törölte a munkát!.","Munka");
    },error=>{
      if(error){
        this.snackService.openErrorSnackBar("A munkát nem sikerült törölni.","Munka");
      }
    });
  
  }
  onIClaimIt(job:JobModel):void{
    this.itWasMe = true;
    this.jobService.claimAJob(job).subscribe((result)=>{
       
          this.snackService.openInformationSnackBar("Sikeresen elválata a munkát.","Munka");
       
    },error=>{
        this.snackService.openInformationSnackBar("Hiba a munka elválalása közben. Keresse meg a rendszergazdát!","Munka");
    });
  }
  onJobToBeChecked(job:JobModel):void{
    this.itWasMe = true;
    this.jobService.setJobToBeChecked(job).subscribe((result)=>{
     
      this.snackService.openInformationSnackBar("Sikeresen leadta a munkát.","Munka");
       
     
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka leadása közben. Keresse meg a rendszergazdát!","Munka");
  });
  }
  onJobDone(job:JobModel):void{
    this.itWasMe = true;
    this.jobService.setJobDone(job).subscribe((result)=>{
     
      this.snackService.openInformationSnackBar("A munkát sikeresen késznek jelölte!","Munka");
   
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka késznek nyilvánítása közben. Keresse meg a rendszergazdát!","Munka");
  });
  }
  onJobIsWrong(job:JobModel):void{
    this.itWasMe = true;
    this.jobService.setJobWrong(job).subscribe((result)=>{    
        this.snackService.openInformationSnackBar("Az elutasítás sikeres. Vissza került az új munkák közé! Ott tudja módosítani a hiba leírását.","Munka");
   
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka elutasítása közben. Keresse meg a rendszergazdát!","Munka");
  });
 
  }
}
