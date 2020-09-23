import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/services/notification.service';
import { MediaService } from "../services/media.service";
import { systemSettings } from "../../../app-config"

@Component({
  selector: 'app-media-form',
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.css']
})
export class MediaFormComponent implements OnInit {
  serverURL=""
  title;
  id;
  xLargeImageUrl;
  largeImageUrl;
  mediumImageUrl;
  smallImageUrl;

 xLargeImageToUpload: File = null;
 largeImageToUpload: File = null;
 mediumImageToUpload: File = null;
 smallImageToUpload: File = null;

 isImageChosed: boolean = false;
 showErrorMSg: boolean;
 constructor(
   public MediaService: MediaService,
   private notificationService: NotificationService,
   private dialogRef: MatDialogRef<MediaFormComponent>,
   @Inject(MAT_DIALOG_DATA) private data
 ) {
   console.log("data",data)
   this.title = data.title;
   this.xLargeImageUrl = data.xLargeImageUrl;
   this.largeImageUrl = data.largeImageUrl;
   this.mediumImageUrl = data.mediumImageUrl;
   this.smallImageUrl = data.smallImageUrl;
   this.id=data.id
 }

 ngOnInit() {
   this.serverURL=systemSettings.serverURL;
 }
 onClear() {
   this.MediaService.form.reset();
 }

 onSubmit() {
   if (this.MediaService.form.valid) {
     //on add a service
     if (this.title === "Add New Media") {
       this.upload("Add");
     } else if (this.title === "Edit A Media") {
       //update a service
       this.upload("Edit");
     }
     this.MediaService.form.reset();
     this.onClose();
   }
 }
 onClose() {
   this.MediaService.form.reset();
   this.dialogRef.close();
   console.log("closed")
 }
 handleXlargeImageFileInput(files: FileList) { //x large
   this.xLargeImageToUpload = files.item(0);
   console.log("this.xLargeImageToUpload", this.xLargeImageToUpload);
   this.isImageChosed = this.isImageChosed == true ? false : true;
   if (this.xLargeImageToUpload) this.showErrorMSg = false;
   else if (!this.xLargeImageToUpload) {
     this.showErrorMSg = true;
   }
 }
 handleLargeImageFileInput(files: FileList) {  //large
  this.largeImageToUpload = files.item(0);
  console.log("this.largeImageToUpload", this.largeImageToUpload);
  this.isImageChosed = this.isImageChosed == true ? false : true;
  if (this.largeImageToUpload) this.showErrorMSg = false;
  else if (!this.largeImageToUpload) {
    this.showErrorMSg = true;
  }
}
handleMediumImageFileInput(files: FileList) {  //medium
  this.mediumImageToUpload = files.item(0);
  console.log("this.mediumImageToUpload", this.mediumImageToUpload);
  this.isImageChosed = this.isImageChosed == true ? false : true;
  if (this.mediumImageToUpload) this.showErrorMSg = false;
  else if (!this.mediumImageToUpload) {
    this.showErrorMSg = true;
  }
}

 handleSmallImageFileInput(files: FileList) {  //small
  this.smallImageToUpload = files.item(0);
  console.log("this.smallImageToUpload", this.smallImageToUpload);
  this.isImageChosed = this.isImageChosed == true ? false : true;
  if (this.smallImageToUpload) this.showErrorMSg = false;
  else if (!this.smallImageToUpload) {
    this.showErrorMSg = true;
  }
}


 upload(type: string) {
   console.log("this.xLargeImageToUpload",this.xLargeImageToUpload)
   console.log("this.largeImageToUpload",this.largeImageToUpload)
   console.log("this.mediumImageToUpload",this.mediumImageToUpload)
   console.log("this.smallImageToUpload",this.smallImageToUpload)

   if (type == "Add") {
     this.MediaService
       .addMedia(this.xLargeImageToUpload,this.largeImageToUpload,this.mediumImageToUpload,this.smallImageToUpload ,{
         Media_Type: this.MediaService.form.value.Media_Type,
         Media_Title: this.MediaService.form.value.Media_Title,
         Media_MetaTags: this.MediaService.form.value.Media_MetaTags,
         Media_AlternativeText: this.MediaService.form.value.Media_AlternativeText,
         Media_Describtion: this.MediaService.form.value.Media_Describtion
       })
       .subscribe(
         status => {
           if (status) {
              this.notificationService.success(":: Uploaded Successfully");
           }else{
             alert("Upload wasn't a success,Please try again");
           }
         }
       );
   } else {
     console.log("form",this.MediaService.form.value)
     this.MediaService
       .updateMedia(this.xLargeImageToUpload,this.largeImageToUpload,this.mediumImageToUpload,this.smallImageToUpload ,{
        Media_Type: this.MediaService.form.value.Media_Type,
        Media_Title: this.MediaService.form.value.Media_Title,
        Media_MetaTags: this.MediaService.form.value.Media_MetaTags,
        Media_AlternativeText: this.MediaService.form.value.Media_AlternativeText,
        Media_Describtion: this.MediaService.form.value.Media_Describtion,
         _id: this.id
       })
       .subscribe(
         status => {
           if (status) {
              this.notificationService.success(":: Updated Successfully");
           }else{
             this.notificationService.failed("Upload wasn't a success,Please try again");
           }
         }
       );
   }
 }

}
