import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReasonOfReturnOrderService } from '../../services/reason-of-return-order.service';

@Component({
  selector: 'app-return-form',
  templateUrl: './return-form.component.html',
  styleUrls: ['./return-form.component.css']
})
export class ReturnFormComponent implements OnInit {

  id;
  title;
  constructor(
    public reasonService: ReasonOfReturnOrderService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ReturnFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.reasonService.form.reset();
  }

  onSubmit() {
    if (this.reasonService.form.valid) {
      //on adding material
      if (this.title === "Add New Reason") {
        this.reasonService.addReason(
          this.reasonService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Reason") {
        //update material
        this.reasonService.updateReason(this.reasonService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.reasonService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.reasonService.form.reset();
    this.dialogRef.close();
  }




}
