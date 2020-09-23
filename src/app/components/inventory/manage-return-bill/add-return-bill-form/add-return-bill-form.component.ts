import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../../authentication/services/auth.service';
import { ReturnBillService } from '../../services/return-bill.service';

@Component({
  selector: 'app-add-return-bill-form',
  templateUrl: './add-return-bill-form.component.html',
  styleUrls: ['./add-return-bill-form.component.css']
})
export class AddReturnBillFormComponent implements OnInit {

  BillReturn_Date:any = "";
  BillReturn_Note:any ="";
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  Cost:any = "";
  Price:any = "";
  BillReturn_Products:any=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //product details
  productCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  products: string[] = [];
  allProducts: any[] = [];
  //supplier details
  supplierCtrl = new FormControl();
  filteredSuppliers: Observable<string[]>;
  suppliers: string[] = [];
  allSuppliers: any[] = [];

  colorVariants:any=[];
  sizeVariants:any=[];
  id;
  title;
  //
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  @ViewChild("supplierInput",{static: false}) supplierInput: ElementRef;

  //
  constructor(
    public authService: AuthService,
    public returnBillService: ReturnBillService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddReturnBillFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.returnBillService.getProducts().subscribe((products:any)=>{
      this.allProducts= products;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.returnBillService.getSuppliers().subscribe((suppliers:any)=>{
      this.allSuppliers= suppliers;
      this.supplierCtrl.valueChanges.subscribe(search => {
        this.filteredSuppliers = of(this.allSuppliers.filter(item =>
          item.Supplier_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.returnBillService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    })
    this.returnBillService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    })
   
    
  }
  //product methods
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
  //supplier methods
  addSupplier(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

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

  removeSupplier(supplier: string): void {
    const index = this.suppliers.indexOf(supplier);

    if (index >= 0) {
      this.suppliers.splice(index, 1);
    }
  }

  selectedSupplier(event: MatAutocompleteSelectedEvent): void {
    console.log("event",event)
    if(this.suppliers.length == 0){
      this.suppliers.push(event.option.viewValue);
      this.supplierInput.nativeElement.value = "";
      //this.productCtrl.setValue(null);
    }
  
  }

  private _filterSupplier(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSuppliers.filter(
      supplier => supplier.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  onAdd() {
    console.log("this.products",this.products)
    console.log("this.productCtrl",this.productCtrl)
    this.BillReturn_Products.push({
      Product:this.productCtrl.value,
      Size_Variant:this.Size_Variant,
      Color_Variant:this.Color_Variant,
      Quantity:this.Quantity,
      Cost:this.Cost,
      Price:this.Price
    });
    this.products=[]
    this.Size_Variant = "";
    this.Color_Variant = "";
    this.Quantity = "";
    this.Cost = "";
    this.Price = "";
  }

  deleteReturnProduct(returnProduct){
     this.BillReturn_Products.splice( this.BillReturn_Products.indexOf(returnProduct), 1);
  }

  onSubmit() {
    console.log("this.BillReturn_Products",this.BillReturn_Products)
    console.log("BillReturn_Date",this.BillReturn_Date)
    console.log("this.BillReturn_Note",this.BillReturn_Note)

        let DataToSend :any={
          BillReturn_Date:this.BillReturn_Date,
          BillReturn_Note:this.BillReturn_Note,
          BillReturn_DoneBy_User:this.authService.currentUser._id,
          Bill_Supplier   : this.supplierCtrl.value._id,
          BillReturn_Products:[],
          Bill_TotalAmount : 0 //will be updated after few lines
        }
        this.BillReturn_Products.forEach((element)=>{
          DataToSend.BillReturn_Products.push({
            Product:element.Product._id,
            Size_Variant:element.Size_Variant._id,
            Color_Variant:element.Color_Variant._id,
            Quantity:element.Quantity,
            Cost:element.Cost,
            Price:element.Price
          })
          DataToSend.Bill_TotalAmount += element.Cost;
        });
        
        this.returnBillService.addSupplierReturnBill(
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
