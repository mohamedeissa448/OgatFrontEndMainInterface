import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { BillingAddressService } from '../services/billing-address.service';

@Component({
  selector: 'app-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.css']
})
export class BillingAddressFormComponent implements OnInit {

  id;
  Customer_Code;
  Customer_Name
  title;
  Customer_BillingAddress:any= {};
  provinces:any = [];
  constructor(
    public billingAdressService: BillingAddressService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<BillingAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.Customer_Code=data.Customer_Code;
    this.Customer_Name=data.Customer_Name;
  }
  
  ngOnInit() {
    this.billingAdressService.getProvinces().subscribe((provinces)=>{
      this.provinces = provinces;
    })
    this.billingAdressService.getCustomerBillingAddressByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      if(response.data.customer.Customer_BillingAddress){
        this.Customer_BillingAddress = response.data.customer.Customer_BillingAddress;
      }
     
    });
  }
 

  onSubmit(){
 
    this.billingAdressService.addBillingAddressToCustomerByCustomerId({
      Customer_BillingAddress :this.Customer_BillingAddress,
      _id:this.id
    }).subscribe((status) => {
      if(status==true)
      this.notificationService.success(":: Updated Successfully");
      else
      this.notificationService.failed(":: Something went wrong,Please try again later!");
    });
    this.onClose();
  }
  onClose() {
    this.dialogRef.close();
  }
}
