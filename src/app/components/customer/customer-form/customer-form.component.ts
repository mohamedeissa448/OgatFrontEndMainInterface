import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// tslint:disable-next-line: quotemark
// tslint:disable-next-line: semicolon
import { NotificationService } from "../../shared/services/notification.service"
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  id;
  Customer_Code;
  title;
  provinces :any=[];
  statusArray:any=[];
  constructor(
    public customerService: CustomerService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    public authService :AuthService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.Customer_Code=data.Supplier_Code
  }

  ngOnInit() {
    this.statusArray=[
    {
      name: "DisActive",
      value: 0
    }];
    if(this.authService.currentUser.User_Permissions.includes('canBlockCustomers'))
        this.statusArray.push({
          name: "Blocked",
          value: 2
        })
    if(this.authService.currentUser.User_Permissions.includes('canUnBlockCustomers'))
        this.statusArray.push({
          name: "Active",
          value: 1
        },)    
    this.customerService.getProvinces().subscribe((countries)=>{
      this.provinces=countries
    })
    
}
  onClear() {
    this.customerService.form.reset();
  }

  onSubmit() {
    let dataToSend:any={};
    dataToSend.Customer_Name = this.customerService.form.value.Customer_Name
    dataToSend.Address ={};
    dataToSend.Address.AddressName = this.customerService.form.value.AddressName
    dataToSend.Address.ContactName = this.customerService.form.value.ContactName
    dataToSend.Address.Mobile = this.customerService.form.value.Mobile
    dataToSend.Address.Building = this.customerService.form.value.Building
    dataToSend.Address.Floor = this.customerService.form.value.Floor
    dataToSend.Address.Apartment = this.customerService.form.value.Apartment
    dataToSend.Address.StreetAddress = this.customerService.form.value.StreetAddress
    dataToSend.Address.City = this.customerService.form.value.City
    dataToSend.Address.Province = this.customerService.form.value.Province
    dataToSend.Customer_Status = this.customerService.form.value.Customer_Status
    if (this.customerService.form.valid) {
      //on adding customer
      if (this.title === "Add New Customer") {
        this.customerService.addCustomer(
          dataToSend
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit A Customer") {
        //update Customer
        this.customerService.updateCustomer(dataToSend,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.customerService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.customerService.form.reset();
    this.dialogRef.close();
  }


}
