import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaModel } from 'src/app/Models/AreaModel';
import { AreaService } from 'src/app/services/area.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas:AreaModel[] = [];
  areaToModify:AreaModel;
  constructor(private areaService:AreaService,private snackService:SnackBarService, private router:Router) { }
  displayedColumns: string[] = ['id', 'name', 'boss', 'modify','delete'];
  ngOnInit(): void {
    this.getAllAreas();
  }
  getAllAreas():void{
    this.areaService.getAllArea().subscribe((areas)=>{
      this.areas = areas;
    
    },error=>{
      console.log(error);
    });
  }
  modifyArea(e):void{
    this.areaToModify = null;
    setTimeout(() => this.areaToModify = e);
    
  }
  areaChanged():void{
    this.areaToModify = null;
  }
  deleteArea(e):void{
    this.areaService.deleteArea(e).subscribe(()=>{
      this.getAllAreas();
      this.snackService.openInformationSnackBar(`Sikeresen törölte a "${e.fullname}" nevű egységet.`,"Elhelyezkedések");
    },error=>{
        this.snackService.openErrorSnackBar(error.error,"Elhelyezkedés törlése hiba.");
    });
    
  }

}
