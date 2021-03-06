import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../../authentication/services/auth.service';
import { AssignedOrdersService } from '../../services/assigned-orders.service';

@Component({
  selector: 'app-change-order-employee',
  templateUrl: './change-order-employee.component.html',
  styleUrls: ['./change-order-employee.component.css']
})
export class ChangeOrderEmployeeComponent implements OnInit {

  Order_Date:any = "";
  Order_Note:any ="";
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  availableProductQuantity:any = "";
  ordered_Products:any=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productCtrl = new FormControl();
  customerCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  filteredCustomers: Observable<string[]>;
  products: string[] = [];
  allProducts: any[] = [];
  customers: string[] = [];
  allCustomers: any[] = [];
  Customer_ShippingAddress:any= {}
  colorVariants:any=[];
  sizeVariants:any=[];
  provinces:any=[];
  users:any=[];
  id;
  title;
  Order_InvntoryHandlingAssignedTo:any={}
  //
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  @ViewChild("customerInput",{static: false}) customerInput: ElementRef;

  constructor(
    public authService: AuthService,
    public AssignedOrdersService: AssignedOrdersService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ChangeOrderEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.AssignedOrdersService.getProducts().subscribe((products:any)=>{
      this.allProducts = products ;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.AssignedOrdersService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    }) ;
    this.AssignedOrdersService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    });
    this.AssignedOrdersService.getProvinces().subscribe((response)=>{
      this.provinces=response;
    });
    this.AssignedOrdersService.getCustomers().subscribe((response :any)=>{
      this.allCustomers=response;
      this.customerCtrl.valueChanges.subscribe(search => {
        this.filteredCustomers = of(this.allCustomers.filter(item =>
          item.Customer_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.AssignedOrdersService.getAllUsers().subscribe((allUsers:any)=>{
      console.log("users",allUsers)
      allUsers.forEach((user)=>{
        if(user.User_Permissions.includes('canAssignOrders'))
          this.users.push(user);
      })

    });

    //initialize form inputs 
      this.AssignedOrdersService.getAffiliateSellerOrderById(this.id).subscribe((outereRsponse:any)=>{
        console.log("outereRsponse",outereRsponse);
        this.Order_InvntoryHandlingAssignedTo = outereRsponse.Order_InvntoryHandlingAssignedTo;
        this.Order_Date = outereRsponse.Order_Date;
        this.Order_Note = outereRsponse.Order_Note;
        this.Customer_ShippingAddress = outereRsponse.Customer_ShippingAddress;
        this.customers.push(outereRsponse.Order_Customer.Customer_Name+',Code('+outereRsponse.Order_Customer.Customer_Code+')');
        this.customerCtrl.setValue(outereRsponse.Order_Customer)
        this.customerInput.nativeElement.value = "";
          outereRsponse.Order_Products.forEach((element)=>{
          this.AssignedOrdersService.getOneProductFromStore({
            Store_Product : element.Product,
            Size_Variant : element.Size_Variant,
            Color_Variant : element.Color_Variant
          }).subscribe(((innerResponse:any) =>{
            this.ordered_Products.push({
              Product:element.Product,
              Size_Variant:element.Size_Variant,
              Color_Variant:element.Color_Variant,
              Quantity:element.Quantity,
              Cost:element.Cost,
              Total_Price:element.Price,
              leftProductQuantity: innerResponse.Store_Quantity - innerResponse.Store_PendingQuantity,
            });
          }))
      
        })
        
      })
    
   
  }
 
  
  onSubmit() {
    let dataToSend = {_id: this.id, Order_InvntoryHandlingAssignedTo :this.Order_InvntoryHandlingAssignedTo}
    this.AssignedOrdersService.reAssignOrderTo(dataToSend).subscribe((status)=>{
      if(status==true)
          this.notificationService.success(":: ReAssigned Task Successfully");
          else
      this.notificationService.failed(":: Something went wrong,Please try again later!");
    })
    this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }
  //the following methods needed just so it can run in build prod
  addCustomer(x){
  }
  selectedCustomer(x){}

}
