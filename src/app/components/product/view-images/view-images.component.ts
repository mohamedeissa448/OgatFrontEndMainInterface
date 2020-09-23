import { Component, OnInit, Inject } from '@angular/core';
import { ViewImagesService } from '../../shared/services/view-images.service';
import { systemSettings } from "../../../app-config"
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
  medias:any=[];
  serverURL:any=""
  Color_Name:any="";
  constructor(
    public viewImagesService:ViewImagesService,
    public dialogRef: MatDialogRef<ViewImagesComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) private data
    ) { 
      if(data && data.Color_Name)
      this.Color_Name = data.Color_Name;
    }

  ngOnInit() {

    this.serverURL=systemSettings.serverURL;
    this.viewImagesService.getMedias().subscribe((medias)=>{
      console.log("medias",medias);
      this.medias=medias;
    })
  }
  onSubmit(){
    if (this.viewImagesService.form.valid) {
      console.log("this.viewImagesService.form.value",this.viewImagesService.form.value)
      this.dialogRef.close({message:true,data:this.viewImagesService.form.value});
      this.viewImagesService.form.reset()
    }
  }
  
  onClose() {

    this.dialogRef.close({message:false});
  }
  addOrRemove(_id){

  }

}
