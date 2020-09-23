import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from '../../../../services/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import { IncreaseInventoryService } from '../../services/increase-inventory.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../../../../authentication/services/auth.service';

@Component({
  selector: 'app-increase-inventory-add-form',
  templateUrl: './increase-inventory-add-form.component.html',
  styleUrls: ['./increase-inventory-add-form.component.css']
})
export class IncreaseInventoryAddFormComponent implements OnInit {
  IncreaseInventory_Date:any = "";
  IncreaseInventory_Note:any ="";
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  Cost:any = "";
  IncreaseInventory_Products:any=[];
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
  //
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  //
  constructor(
    public authService: AuthService,
    public increaseInventoryService: IncreaseInventoryService,
    public toastService: ToastService,
    public dialogRef: MatDialogRef<IncreaseInventoryAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.increaseInventoryService.getProducts().subscribe((products:any)=>{
      this.allProducts= products;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.increaseInventoryService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    })
    this.increaseInventoryService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    })
   
    
  }
  
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
    }
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  onAdd() {
    this.IncreaseInventory_Products.push({
      Product:this.productCtrl.value,
      Size_Variant:this.Size_Variant,
      Color_Variant:this.Color_Variant,
      Quantity:this.Quantity,
      Cost:this.Cost
    });
    //this.products=[]
    //this.Size_Variant = "";
    //this.Color_Variant = "";
    this.Quantity = "";
    //this.Cost = "";
  }

  deleteIncreaseProduct(increaeProduct){
     this.IncreaseInventory_Products.splice( this.IncreaseInventory_Products.indexOf(increaeProduct), 1);
  }

  onSubmit() {
    let DataToSend={
      IncreaseInventory_Date:this.IncreaseInventory_Date,
      IncreaseInventory_Note:this.IncreaseInventory_Note,
      IncreaseInventory_DoneBy_User:this.authService.currentUser._id,
      IncreaseInventory_Products:[]
    }
    this.IncreaseInventory_Products.forEach((element)=>{
      DataToSend.IncreaseInventory_Products.push({
        Product:element.Product._id,
        Size_Variant:element.Size_Variant._id,
        Color_Variant:element.Color_Variant._id,
        Quantity:element.Quantity,
        Cost:element.Cost
      })
    })
    this.increaseInventoryService.addIncreaseInventory(
      DataToSend
    ).subscribe((status) => {
      if(status==true){
        console.log(status)
        this.toastService.success("Added Successfully");
        this.dialogRef.close();
      }
      else
        this.toastService.failed("Something went wrong,Please try again later!");
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
