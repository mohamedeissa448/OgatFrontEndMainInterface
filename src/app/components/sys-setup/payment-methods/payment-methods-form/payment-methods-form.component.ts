import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../shared/services/notification.service';
import { PaymentMethodsService } from '../../services/payment-methods.service';

@Component({
  selector: 'app-payment-methods-form',
  templateUrl: './payment-methods-form.component.html',
  styleUrls: ['./payment-methods-form.component.css']
})
export class PaymentMethodsFormComponent implements OnInit {

  id;
  title;
  constructor(
    public paymentMethodsService: PaymentMethodsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PaymentMethodsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.paymentMethodsService.form.reset();
  }

  onSubmit() {
    if (this.paymentMethodsService.form.valid) {
      //on adding size
      if (this.title === "Add New Payment Method") {
        this.paymentMethodsService.addPaymentMethod(
          this.paymentMethodsService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Payment Method") {
        //update size
        this.paymentMethodsService.updatePaymentMethod(this.paymentMethodsService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.paymentMethodsService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.paymentMethodsService.form.reset();
    this.dialogRef.close();
  }
}
