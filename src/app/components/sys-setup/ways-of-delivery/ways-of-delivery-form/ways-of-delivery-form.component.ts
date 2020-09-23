import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../shared/services/notification.service';
import { WaysOfDeliveryService } from '../../services/ways-of-delivery.service';

@Component({
  selector: 'app-ways-of-delivery-form',
  templateUrl: './ways-of-delivery-form.component.html',
  styleUrls: ['./ways-of-delivery-form.component.css']
})
export class WaysOfDeliveryFormComponent implements OnInit {

  id;
  title;
  constructor(
    public waysOfDeliveryService: WaysOfDeliveryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<WaysOfDeliveryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.waysOfDeliveryService.form.reset();
  }

  onSubmit() {
    if (this.waysOfDeliveryService.form.valid) {
      //on adding Way Of Delivery
      if (this.title === "Add New Way Of Delivery") {
        this.waysOfDeliveryService.addWayOfDelivery(
          this.waysOfDeliveryService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Way Of Delivery") {
        //update Way Of Delivery
        this.waysOfDeliveryService.updateWayOfDelivery(this.waysOfDeliveryService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.waysOfDeliveryService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.waysOfDeliveryService.form.reset();
    this.dialogRef.close();
  }

}
