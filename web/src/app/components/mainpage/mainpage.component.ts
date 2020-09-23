import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {JobModel} from '../../Models/JobModel';
import { AuthguardService } from 'src/app/services/authguard.service';
import {JobService} from '../../services/job.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  inProgressJobs:JobModel[] = [];
  newJobs:JobModel[] = [];
  currentMonthJobs:JobModel[]=[];
  checkNeededJobs:JobModel[]=[];
  constructor(public authGuard:AuthguardService, private jobService:JobService, private router:Router, private snackService:SnackBarService) {
    
   }

  ngOnInit(): void {
    this.generateTempData();
  }
  generateTempData():void{
    this.jobService.getInProgressJobs().subscribe((jobs)=>{
   
      this.inProgressJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a folyamatban lévő munkák lekérése közben.","Lekérés");
    });
    this.getNewJobs();
    this.jobService.getCurrentMonthDoneJobs().subscribe((jobs)=>{
     
      this.currentMonthJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a havi munkák lekérése közben","Munka");
    });
    this.jobService.getNeedToCheckJobs().subscribe((jobs)=>{
     
      this.checkNeededJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba a ellenőrizendő munkák letöltése közben.","Munka");
    });
  }
  addJob(){
  
    this.router.navigate(["ujmunka"]);
  }
  onDeleteJob(job:JobModel){
    this.jobService.deleteJob(job).subscribe(result=>{
        this.getNewJobs();
        this.snackService.openInformationSnackBar("Sikeresen törölte a munkát!.","Munka");
    },error=>{
      if(error){
        this.snackService.openErrorSnackBar("A munkát nem sikerült törölni.","Munka");
      }
    });
  
  }
  getNewJobs():void{
    this.jobService.getNewJobs().subscribe((jobs)=>{
      this.newJobs = jobs;
    },error=>{
      this.snackService.openErrorSnackBar("Hiba az új munkák lekérése közben.","Lekérés");
    });
  }
  onIClaimIt(job:JobModel):void{
    this.jobService.claimAJob(job).subscribe((result)=>{
          this.newJobs = this.newJobs.map(p => {if(p.id != job.id) return p});
          job.worker = this.authGuard.getLoggedInUser();
          this.inProgressJobs.push(job)
          this.snackService.openInformationSnackBar("Sikeresen elválata a munkát.","Munka");
       
    },error=>{
        this.snackService.openInformationSnackBar("Hiba a munka elválalása közben. Keresse meg a rendszergazdát!","Munka");
    });
  }
  onJobToBeChecked(job:JobModel):void{
   
    this.jobService.setJobToBeChecked(job).subscribe((result)=>{
      this.inProgressJobs = this.inProgressJobs.map(p => {if(p.id != job.id) return p});
      job.proceedDate = new Date();
      this.checkNeededJobs.push(job)
      this.snackService.openInformationSnackBar("Sikeresen elválata a munkát.","Munka");
       
     
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka leadása közben. Keresse meg a rendszergazdát!","Munka");
  });
  }
  onJobDone(job:JobModel):void{
    this.jobService.setJobDone(job).subscribe((result)=>{
      this.checkNeededJobs = this.checkNeededJobs.map(p => {if(p.id != job.id) return p});
      job.doneDate = new Date();
      this.currentMonthJobs.push(job);
      this.snackService.openInformationSnackBar("A munkát sikeresen késznek jelölte!","Munka");
   
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka késznek nyilvánítása közben. Keresse meg a rendszergazdát!","Munka");
  });
  }
  onJobIsWrong(job:JobModel):void{
    this.jobService.setJobWrong(job).subscribe((result)=>{
        this.router.navigate(["bejelenetkezes"]);
        this.snackService.openInformationSnackBar("Az elutasítás sikeres. Vissza került az új munkák közé! Ott tudja módosítani a hiba leírását.","Munka");
   
  },error=>{
      this.snackService.openInformationSnackBar("Hiba a munka elutasítása közben. Keresse meg a rendszergazdát!","Munka");
  });
  }
}
