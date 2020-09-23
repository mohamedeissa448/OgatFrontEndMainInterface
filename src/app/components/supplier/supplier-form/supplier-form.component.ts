import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SupplierService } from '../services/supplier.service';
// tslint:disable-next-line: quotemark
// tslint:disable-next-line: semicolon
import { NotificationService } from "../../shared/services/notification.service"
@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  id;
  Supplier_Code;
  title;
  countries :any=[];
  supplierCategories:any=[];
  classes:any=[];
  paymentMethods:any=[];
  waysOfDeliveries:any=[];
  constructor(
    public supplierService: SupplierService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SupplierFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    // tslint:disable-next-line: whitespace
    this.id=data.id;
    this.Supplier_Code=data.Supplier_Code
  }

  ngOnInit() {
    this.supplierService.getCountries().subscribe((countries)=>{
      this.countries=countries
    })
    this.supplierService.getSupplierCategories().subscribe((supplierCategories)=>{
      this.supplierCategories=supplierCategories
    })
   
  this.supplierService.getClasses().subscribe((classes)=>{
    this.classes=classes
  });
  this.supplierService.getPaymentMethods().subscribe((paymentMethods)=>{
    this.paymentMethods=paymentMethods
  });
  this.supplierService.getWaysOfDelivery().subscribe((waysOfDeliveries)=>{
    this.waysOfDeliveries=waysOfDeliveries
  })
}
  onClear() {
    this.supplierService.form.reset();
  }

  onSubmit() {
    if (this.supplierService.form.valid) {
      //on adding supplier
      if (this.title === "Add New Supplier") {
        this.supplierService.addSupplier(
          this.supplierService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit A Supplier") {
        //update supplier
        this.supplierService.updateSupplier(this.supplierService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.supplierService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.supplierService.form.reset();
    this.dialogRef.close();
  }



}
