import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../authentication/services/auth.service';
import { CollectOrdersService } from '../../services/collect-orders.service';

@Component({
  selector: 'app-collect-order-form',
  templateUrl: './collect-order-form.component.html',
  styleUrls: ['./collect-order-form.component.css']
})
export class CollectOrderFormComponent implements OnInit {

  paymentMethods:any =[];
  Order_Status:any="";
  Order_PaymentBy:any="";
  title:any = "";
  id:any = "";
  Original_Order_Products:any =[];

  constructor(public authService: AuthService,
    public collectOrdersService: CollectOrdersService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CollectOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.title = data.title;
      this.id=data.id
     }

  ngOnInit() {
    console.log('ddd')
    this.collectOrdersService.getPaymentMethods().subscribe((paymentMethods:any)=>{
      this.paymentMethods = paymentMethods;
     
    });
    this.collectOrdersService.getAffiliateSellerOrderById(this.id).subscribe((order:any)=>{
      this.Original_Order_Products = order.Order_Products;
     
    });
  }
  onSubmit(){
    let dataToSend:any = {
       _id          : this.id,
       Order_Status : "Collected"
      }
        dataToSend.Order_PaymentBy = this.Order_PaymentBy ;
        this.collectOrdersService.collectOrder(dataToSend).subscribe((status)=>{
          if(status==true)
              this.notificationService.success(":: Order Collected Successfully");
          else
              this.notificationService.failed(":: Something went wrong,Please try again later!");
        })
      
       
   
    this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }

}
