import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import { IncreaseInventoryService } from '../../services/increase-inventory.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../../../../authentication/services/auth.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-add-form.component.html',
  styleUrls: ['./bill-add-form.component.css']
})
export class BillAddFormComponent implements OnInit {

  Bill_Date:any = "";
  Bill_Note:any ="";
  Bill_PaymentMethod: any ="";;
  Bill_TaxAmount: any = 0;
  TotalBillAmount : any = 0;
  paymentMethods:any = [];
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  Cost:any = "";
  Bill_Products:any=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  products: string[] = [];
  allProducts: any[] = [];
  
  colorVariants:any=[];
  sizeVariants:any=[];
  id;
  title;
  //supplier auto complete
  supplierCtrl = new FormControl();
  filteredSuppliers: Observable<string[]>;
  suppliers: string[] = [];
  allSuppliers: any[] = [];

  @ViewChild("supplierInput",{static: false}) supplierInput: ElementRef;
  //
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  
  //
  constructor(
    public authService: AuthService,
    public billService: BillService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<BillAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.billService.getProducts().subscribe((products:any)=>{
      this.allProducts= products;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.billService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    });
    this.billService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    });
    this.billService.getPaymentMethods().subscribe((paymentMethods)=>{
      this.paymentMethods = paymentMethods;
    })
    this.billService.getSuppliers().subscribe((response :any)=>{
      this.allSuppliers=response;
      this.supplierCtrl.valueChanges.subscribe(search => {
        this.filteredSuppliers = of(this.allSuppliers.filter(item =>
          item.Supplier_Name.toLowerCase().includes(search)
        ));
      });
    });
    
  }
  /***********Bill */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.products.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.productCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.products.indexOf(fruit);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("event",event)
    if(this.products.length == 0){
      this.products.push(event.option.viewValue);
      this.productInput.nativeElement.value = "";
      //this.productCtrl.setValue(null);
    }
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
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

  onAdd() {
    console.log("this.products",this.products)
    console.log("this.productCtrl",this.productCtrl)
    this.Bill_Products.push({
      Product:this.productCtrl.value,
      Size_Variant:this.Size_Variant,
      Color_Variant:this.Color_Variant,
      Quantity:this.Quantity,
      Cost:this.Cost
    });
    this.TotalBillAmount = this.TotalBillAmount + (this.Quantity * this.Cost)
    // this.products=[]
    // this.Size_Variant = "";
    // this.Color_Variant = "";
    this.Quantity = "";
    // this.Cost = "";
  }

  deleteBillProduct(increaeProduct){
     this.Bill_Products.splice( this.Bill_Products.indexOf(increaeProduct), 1);
     this.TotalBillAmount = this.TotalBillAmount - (increaeProduct.Quantity * increaeProduct.Cost)

  }

  onSubmit() {
    console.log("this.this.Bill_Products",this.Bill_Products)
    console.log("Bill_Date",this.Bill_Date)
    console.log("Bill_Note",this.Bill_Note)

        let DataToSend : any={
          Bill_Date:this.Bill_Date,
          Bill_Note:this.Bill_Note,
          Bill_DoneBy_User:this.authService.currentUser._id,
          Bill_Supplier : this.supplierCtrl.value._id,
          Bill_TotalAmount :0, //updated after few lines
          Bill_TaxAmount  : this.Bill_TaxAmount,
          Bill_PaymentMethod : this.Bill_PaymentMethod,
          Bill_Products:[]
        }
        this.Bill_Products.forEach((element)=>{
          DataToSend.Bill_Products.push({
            Product:element.Product._id,
            Size_Variant:element.Size_Variant._id,
            Color_Variant:element.Color_Variant._id,
            Quantity:element.Quantity,
            Cost:element.Cost
          });
          DataToSend.Bill_TotalAmount += element.Cost *element.Quantity;
        })
        DataToSend.Bill_FinalAmount = DataToSend.Bill_TotalAmount + this.Bill_TaxAmount ;
        this.billService.addSupplierBill(
          DataToSend
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
     
      this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }

}
