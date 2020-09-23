
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../authentication/services/auth.service';
import { ShippedOrdersService } from '../../services/shipped-orders.service';

@Component({
  selector: 'app-return-or-collect-order',
  templateUrl: './return-or-collect-order.component.html',
  styleUrls: ['./return-or-collect-order.component.css']
})
export class ReturnOrCollectOrderComponent implements OnInit {

  allStatus:any= [];
  paymentMethods:any =[];
  Order_Status:any="";
  Order_CustomerPaymentStatus:any="";
  title:any = "";
  id:any = "";
 
  //return details
  returnReasons:any = [];
  Return_Date: any = "";;
  Return_ReasonOfReturn: any = "";;
  Return_Note: any = "";
  Return_ShippingCompanyRefNumber: any = "";;
  Return_Products: any=[];
  Original_Order_Products:any =[];
  constructor(public authService: AuthService,
    public shippedOrdersService: ShippedOrdersService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ReturnOrCollectOrderComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.title = data.title;
    this.id=data.id
     }

  ngOnInit() {
    console.log('ddd')
    this.allStatus = ['Collected'];
    if(this.authService.currentUser.User_Permissions.includes('canReturnOrders'))
       this.allStatus.push('Returned') ;

    this.paymentMethods = ['COD',' Paid'];
    this.shippedOrdersService.getReturnReasons().subscribe((returnReasons:any)=>{
      this.returnReasons = returnReasons;
    });
    this.shippedOrdersService.getAffiliateSellerOrderById(this.id).subscribe((order:any)=>{
      this.Original_Order_Products = order.Order_Products;
      //initialize returned quantities with 0
      this.Original_Order_Products.forEach((element)=>{
        element.returnedQuantity = 0 ;
      });
    });
  }
  onSubmit(){
    let dataToSend:any = {
      _id :this.id,
       Order_Status:this.Order_Status 
      }
      if(this.Order_Status == 'Collected'){
        dataToSend.Order_CustomerPaymentStatus = this.Order_CustomerPaymentStatus ;
        this.shippedOrdersService.collectOrder(dataToSend).subscribe((status)=>{
          if(status==true)
              this.notificationService.success(":: Order Status Updated Successfully");
          else
              this.notificationService.failed(":: Something went wrong,Please try again later!");
        })
      }
       if(this.Order_Status == 'Returned'){
        this.Original_Order_Products.forEach((element)=>{
          this.Return_Products.push({
            Product : element.Product._id,
            Color_Variant : element.Color_Variant._id,
            Size_Variant : element.Size_Variant._id,
            Cost : (element.returnedQuantity *element.Cost) / element.Quantity,
            Price : (element.returnedQuantity *element.Price) / element.Quantity,
            Quantity : element.returnedQuantity,
            //missing StoreLocation
          })
   
        });
        dataToSend.Order_Return_Details = {
          Return_Date : this.Return_Date,
          Return_ReasonOfReturn : this.Return_ReasonOfReturn,
          Return_Note : this.Return_Note,
          Return_ShippingCompanyRefNumber : this.Return_ShippingCompanyRefNumber,
          Return_Products : this.Return_Products,
          Return_HandledBy : this.authService.currentUser._id
        };
        this.shippedOrdersService.returnOrderProducts(dataToSend).subscribe((status)=>{
          if(status==true)
              this.notificationService.success(":: Order Status Updated Successfully");
              else
              this.notificationService.failed(":: Something went wrong,Please try again later!");
        })
      }
   
    //this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }

}
