import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ShippingAddressService } from '../services/shipping-address.service';

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.css']
})
export class ShippingAddressFormComponent implements OnInit {

  id;
  Customer_Code;
  Customer_Name
  title;
  Customer_ShippingAddress:any= {};
  provinces:any = [];
  constructor(
    public shippingAdressService: ShippingAddressService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ShippingAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.Customer_Code=data.Customer_Code;
    this.Customer_Name=data.Customer_Name;
  }
  
  ngOnInit() {
    this.shippingAdressService.getProvinces().subscribe((provinces)=>{
      this.provinces = provinces;
    })
    this.shippingAdressService.getCustomerShippingAddressByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      if(response.data.customer.Customer_ShippingAddress){
        this.Customer_ShippingAddress = response.data.customer.Customer_ShippingAddress;
      }
     
    });
  }
 

  onSubmit(){
 
    this.shippingAdressService.addShippingAddressToCustomerByCustomerId({
      Customer_ShippingAddress :this.Customer_ShippingAddress,
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
