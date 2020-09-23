import { NotificationService } from "../../shared/services/notification.service"
import { SupplierPaymentsService } from '../services/supplier-payments.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-supplier-payment-form',
  templateUrl: './supplier-payment-form.component.html',
  styleUrls: ['./supplier-payment-form.component.css']
})
export class SupplierPaymentFormComponent implements OnInit {

  id;
  title;
  Supplier_Name;
  SupplierPayment_Date :any= {};
  paymentMethods:any = [];
  SupplierPayment_PaymentMethod:any = "";
  SupplierPayment_Amount:any = "";
  //supplier auto complete
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  supplierCtrl = new FormControl();
  filteredSuppliers: Observable<string[]>;
  suppliers: string[] = [];
  allSuppliers: any[] = [];

  @ViewChild("supplierInput",{static: false}) supplierInput: ElementRef;

  constructor(
    public supplierPaymentService: SupplierPaymentsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SupplierPaymentFormComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id;
  }
  
  ngOnInit() {
    this.supplierPaymentService.getPaymentMethods().subscribe((paymentMethods)=>{
      this.paymentMethods = paymentMethods;
    })
    this.supplierPaymentService.getPaymentByID(this.id).subscribe((response:any)=>{
      console.log("response",response)
      if(response.message == true){
        this.Supplier_Name = response.payment.SupplierPayment_Supplier.Supplier_Name;
        this.SupplierPayment_Date = response.payment.SupplierPayment_Date;
        this.SupplierPayment_PaymentMethod= response.payment.SupplierPayment_PaymentMethod._id;
        this.SupplierPayment_Amount = response.payment.SupplierPayment_Amount;
        this.suppliers.push(response.payment.SupplierPayment_Supplier.Supplier_Name+',Code('+response.payment.SupplierPayment_Supplier.Supplier_Code+')');
        this.supplierCtrl.setValue(response.payment.SupplierPayment_Supplier)
        this.supplierInput.nativeElement.value = "";

      }
     
    });
    this.supplierPaymentService.getSuppliers().subscribe((response :any)=>{
      this.allSuppliers=response;
      this.supplierCtrl.valueChanges.subscribe(search => {
        this.filteredSuppliers = of(this.allSuppliers.filter(item =>
          item.Supplier_Name.toLowerCase().includes(search)
        ));
      });
    });
  }
 
  /***********Supplier */
  /********add Supplier */
  addSupplier(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log("value.trim()",value.trim())
    // Add our fruit
    if ((value || "").trim()) {
      this.suppliers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.supplierCtrl.setValue(null);
  }
  /********remove supplier */
  removeSupplier(supplier: string): void {
    const index = this.suppliers.indexOf(supplier);

    if (index >= 0) {
      this.suppliers.splice(index, 1);
    }
  }
/***********select supplier */
  selectedSupplier(event: MatAutocompleteSelectedEvent): void {
    console.log("event",event);
    
    if(this.suppliers.length == 0){
      this.suppliers.push(event.option.viewValue);
      this.supplierInput.nativeElement.value = "";
    }
  
  }
/*******filter supplier */
  private _filterSupplier(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSuppliers.filter(
      supplier => supplier.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSubmit(){
    
    if (this.title === "Add New Payment") {
      console.log("SupplierPayment_Supplier ",this.supplierCtrl.value._id)
      this.supplierPaymentService.addSupplierPayment({
        SupplierPayment_Date : this.SupplierPayment_Date,
        SupplierPayment_PaymentMethod : this.SupplierPayment_PaymentMethod,
        SupplierPayment_Amount : this.SupplierPayment_Amount,
        SupplierPayment_DoneBy_User : this.authService.currentUser._id,
        SupplierPayment_Supplier : this.supplierCtrl.value._id
      }
      ).subscribe((status) => {
        if(status==true)
        this.notificationService.success(":: Added Successfully");
        else
        this.notificationService.failed(":: Something went wrong,Please try again later!");
      });
      
    } else if (this.title === "Edit Payment") {
      this.supplierPaymentService.updateSupplierPayment({
        SupplierPayment_Date : this.SupplierPayment_Date,
        SupplierPayment_PaymentMethod : this.SupplierPayment_PaymentMethod,
        SupplierPayment_Amount : this.SupplierPayment_Amount,
        SupplierPayment_DoneBy_User : this.authService.currentUser._id,
        SupplierPayment_Supplier : this.supplierCtrl.value._id
      },this.id).subscribe((status) => {
        if(status==true)
        this.notificationService.success(":: Updated Successfully");
        else
        this.notificationService.failed(":: Something went wrong,Please try again later!");
      });
    }
    //this.onClose();
  }
  onClose() {
    this.dialogRef.close();
  }


}
