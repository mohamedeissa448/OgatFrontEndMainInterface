import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../../authentication/services/auth.service';
import { DecreaseInventoryService } from '../../services/decrease-inventory.service';

@Component({
  selector: 'app-decrease-inventory-edit-form',
  templateUrl: './decrease-inventory-edit-form.component.html',
  styleUrls: ['./decrease-inventory-edit-form.component.css']
})
export class DecreaseInventoryEditFormComponent implements OnInit {

  DecreaseInventory_Date:any = "";
  DecreaseInventory_Note:any ="";
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  Cost:any = "";
  Price:any = "";
  DecreaseInventory_Products:any=[];
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
    public authService:AuthService,
    public decreaseInventoryService: DecreaseInventoryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DecreaseInventoryEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.decreaseInventoryService.getProducts().subscribe((products:any)=>{
      this.allProducts= products;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.decreaseInventoryService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    })
    this.decreaseInventoryService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    })
   //initialize form inputs
   this.decreaseInventoryService.getOneById(this.id).subscribe((response:any)=>{
    console.log("response",response);
    this.DecreaseInventory_Date = response.DecreaseInventory_Date;
    this.DecreaseInventory_Note = response.DecreaseInventory_Note;
    response.DecreaseInventory_Products.forEach((element)=>{
      this.DecreaseInventory_Products.push({
        Product:element.Product,
        Size_Variant:element.Size_Variant,
        Color_Variant:element.Color_Variant,
        Quantity:element.Quantity,
        Cost:element.Cost,
        Price:element.Price
      });
    })
    
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
      //this.productCtrl.setValue(null);
    }
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  onAdd() {
    console.log("this.products",this.products)
    console.log("this.productCtrl",this.productCtrl)
    this.DecreaseInventory_Products.push({
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
    this.Price= "";
  }

  deleteDecreaseProduct(increaeProduct){
     this.DecreaseInventory_Products.splice( this.DecreaseInventory_Products.indexOf(increaeProduct), 1);
  }

  onSubmit() {
    console.log("this.DecreaseInventory_Products",this.DecreaseInventory_Products)
    console.log("DecreaseInventory_Date",this.DecreaseInventory_Date)
    console.log("this.DecreaseInventory_Note",this.DecreaseInventory_Note)

        let DataToSend={
          DecreaseInventory_Date:this.DecreaseInventory_Date,
          DecreaseInventory_Note:this.DecreaseInventory_Note,
          DecreaseInventory_DoneBy_User:this.authService.currentUser._id,
          DecreaseInventory_Products:[]
        }
        this.DecreaseInventory_Products.forEach((element)=>{
          DataToSend.DecreaseInventory_Products.push({
            Product:element.Product._id,
            Size_Variant:element.Size_Variant._id,
            Color_Variant:element.Color_Variant._id,
            Quantity:element.Quantity,
            Cost:element.Cost,
            Price:element.Price
          })
        })
        console.log("DataToSend",DataToSend)
        this.decreaseInventoryService.updateDecreaseInventory(
          DataToSend,this.id
        ).subscribe((status) => {
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
