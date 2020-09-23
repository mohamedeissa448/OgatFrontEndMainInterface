import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ColorVariantService} from "../../services/color-variant.service"
@Component({
  selector: 'app-color-variant-form',
  templateUrl: './color-variant-form.component.html',
  styleUrls: ['./color-variant-form.component.css']
})
export class ColorVariantFormComponent implements OnInit {

   title;
   id;
  imageUrl;
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  showErrorMSg: boolean;
  Color_HexaDecimalBasedValue
  constructor(
    public ColorVariantService: ColorVariantService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ColorVariantFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.imageUrl = data.imageUrl;
    this.id=data.id
  }

  ngOnInit() {
    this.Color_HexaDecimalBasedValue= this.ColorVariantService.form.get('Color_HexaDecimalBasedValue').value
  }
  onClear() {
    this.ColorVariantService.form.reset();
  }

  onSubmit() {
    if (this.ColorVariantService.form.valid) {
      //on adding Color
      if (this.title === "Add New Color") {
        this.ColorVariantService.addColor(
          this.ColorVariantService.form.value,this.Color_HexaDecimalBasedValue
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit A Color") {
        //update Color
        this.ColorVariantService.updateColor(this.ColorVariantService.form.value,this.id,this.Color_HexaDecimalBasedValue).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.ColorVariantService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.ColorVariantService.form.reset();
    this.dialogRef.close();
    console.log("closed")
  }
  
}
