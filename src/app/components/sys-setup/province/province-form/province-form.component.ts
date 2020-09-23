import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProvinceService } from '../../services/province.service';

@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.css']
})
export class ProvinceFormComponent implements OnInit {

  id;
  title;
  constructor(
    public provinceService: ProvinceService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProvinceFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.provinceService.form.reset();
  }

  onSubmit() {
    if (this.provinceService.form.valid) {
      //on adding country
      if (this.title === "Add New Province") {
        this.provinceService.addProvince(
          this.provinceService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Province") {
        //update country
        this.provinceService.updateProvince(this.provinceService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.provinceService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.provinceService.form.reset();
    this.dialogRef.close();
  }

}
