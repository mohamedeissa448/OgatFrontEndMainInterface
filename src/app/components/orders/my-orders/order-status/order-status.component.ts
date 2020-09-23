import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../authentication/services/auth.service';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  allStatus:any= [];
  paymentMethods:any =[];
  Order_Status:any="";
  Order_CustomerPaymentStatus:any="";
  title:any = "";
  id:any = "";
  //cancel details
  Cancelation_Date:any = "";
  Cancelation_ReasonOfCancelation:any = "";
  Cancelation_Note:any = "";
  cancelationReasons:any = [];
 
  constructor(public authService: AuthService,
    public myOrderService: MyOrderService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<OrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.title = data.title;
    this.id=data.id
     }

  ngOnInit() {
    this.allStatus = ['Cancelled'];
    this.myOrderService.getCancelReasons().subscribe((cancelReasons:any)=>{
      this.cancelationReasons = cancelReasons;
    });
    
    
  }
  onSubmit(){
    let dataToSend:any = {
      _id :this.id,
       Order_Status:this.Order_Status 
      }
       if(this.Order_Status == 'Cancelled'){
        dataToSend.Order_CancelationDetails = {
          Cancelation_Date : this.Cancelation_Date,
          Cancelation_ReasonOfCancelation : this.Cancelation_ReasonOfCancelation,
          Cancelation_Note : this.Cancelation_Note,
          Cancelation_HandledBy : this.authService.currentUser._id
        };
        this.myOrderService.cancelOrder(dataToSend).subscribe((status)=>{
          if(status==true)
              this.notificationService.success(":: Order Status Updated Successfully");
          else
              this.notificationService.failed(":: Something went wrong,Please try again later!");
        })
      }
   
    this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }
  

}
