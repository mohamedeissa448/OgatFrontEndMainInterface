import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { PayToAffiliateService } from '../services/pay-to-affiliate.service';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-pay-to-affiliate',
  templateUrl: './pay-to-affiliate.component.html',
  styleUrls: ['./pay-to-affiliate.component.css']
})
export class PayToAffiliateComponent implements OnInit {

  id;
  AffiliateSeller_Code;
  AffiliateSeller_Name
  title;
  AffiliateSeller_PaymentLog:any=[];
  paymentMethods:any=[];
  Payment_Date :any = "";
  Payment_PaidAmount :any = "";
  Payment_PaidMethod :any = "";
  Payment_PaymentRefranceNumber :any = "";
  Payment_PaymentExtraDetails   :any = "";
  constructor(
    private authService:AuthService,
    public paymentsService: PayToAffiliateService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PayToAffiliateComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.AffiliateSeller_Code=data.AffiliateSeller_Code
    this.AffiliateSeller_Name=data.AffiliateSeller_Name

    this.paymentsService.getAffiliateSellerPaymentsByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      this.AffiliateSeller_PaymentLog = response.data.seller.AffiliateSeller_PaymentLog;
    });

  }
  
  ngOnInit() {
    this.paymentsService.getPaymentMethods().subscribe((response:any)=>{
      this.paymentMethods = response;
    });
}
 
  onAdd(f) {
    console.log("f",f);
    if(!this.AffiliateSeller_PaymentLog){
      this.AffiliateSeller_PaymentLog=[]
    }

    this.AffiliateSeller_PaymentLog.push({
      Payment_Date :f.form.value.Payment_Date,
      Payment_PaidAmount :f.form.value.Payment_PaidAmount,
      Payment_PaidMethod :f.form.value.Payment_PaidMethod,
      Payment_PaymentRefranceNumber :f.form.value.Payment_PaymentRefranceNumber,
      Payment_PaymentExtraDetails :f.form.value.Payment_PaymentExtraDetails,
      Payment_PaidByUser :this.authService.currentUser,
    });
    f.form.reset();
  }

  deletePayment(payment){
     this.AffiliateSeller_PaymentLog.splice( this.AffiliateSeller_PaymentLog.indexOf(payment), 1);
  }

  onSubmit(){
    this.AffiliateSeller_PaymentLog.forEach((element)=>{
      element.Payment_PaidMethod=element.Payment_PaidMethod._id;
      element.Payment_PaidByUser=element.Payment_PaidByUser._id;
    })
    this.paymentsService.addPaymentsToAffiliateSellerByAffiliateSellerId({
      AffiliateSeller_PaymentLog :this.AffiliateSeller_PaymentLog,
      _id:this.id
    }).subscribe((status) => {
      if(status==true)
      this.notificationService.success(":: Updated Successfully");
      else
      this.notificationService.failed(":: Something went wrong,Please try again later!");
    });
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }


}
