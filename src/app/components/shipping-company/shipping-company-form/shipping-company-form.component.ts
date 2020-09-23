import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from "../../shared/services/notification.service"
import { ShippingCompanyService } from '../services/shipping-company.service';

@Component({
  selector: 'app-shipping-company-form',
  templateUrl: './shipping-company-form.component.html',
  styleUrls: ['./shipping-company-form.component.css']
})
export class ShippingCompanyFormComponent implements OnInit {

  id;
  ShippingCompany_Code;
  title;
  countries :any=[];
  classes:any=[];
  constructor(
    public shippingCompanyService: ShippingCompanyService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ShippingCompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.ShippingCompany_Code=data.ShippingCompany_Code
  }

  ngOnInit() {
    this.shippingCompanyService.getCountries().subscribe((countries)=>{
      this.countries=countries
    })
   
  this.shippingCompanyService.getClasses().subscribe((classes)=>{
    this.classes=classes
  });

}
  onClear() {
    this.shippingCompanyService.form.reset();
  }

  onSubmit() {
    if (this.shippingCompanyService.form.valid) {
      //on adding Shipping
      if (this.title === "Add New Shipping Company") {
        this.shippingCompanyService.addShippingCompany(
          this.shippingCompanyService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit A Shipping Company") {
        //update Shipping
        this.shippingCompanyService.updateShippingCompany(this.shippingCompanyService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.shippingCompanyService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.shippingCompanyService.form.reset();
    this.dialogRef.close();
  }


}
