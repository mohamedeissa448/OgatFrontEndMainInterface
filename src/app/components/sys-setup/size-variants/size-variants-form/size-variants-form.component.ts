import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SizeVariantsService } from '../../services/size-variants.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../shared/services/notification.service';
@Component({
  selector: 'app-size-variants-form',
  templateUrl: './size-variants-form.component.html',
  styleUrls: ['./size-variants-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SizeVariantsFormComponent implements OnInit {
  id;
  title;
  constructor(
    public sizesService: SizeVariantsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SizeVariantsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.sizesService.form.reset();
  }

  onSubmit() {
    if (this.sizesService.form.valid) {
      //on adding size
      if (this.title === "Add New Size") {
        this.sizesService.addSize(
          this.sizesService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Size") {
        //update size
        this.sizesService.updateSize(this.sizesService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.sizesService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.sizesService.form.reset();
    this.dialogRef.close();
  }

}
