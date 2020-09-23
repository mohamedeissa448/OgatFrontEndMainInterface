import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {  MatAutocompleteSelectedEvent,MatChipInputEvent, MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../authentication/services/auth.service';
import { CancelledOrdersService } from "../services/cancelled-orders.service"
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { RecreateOrderComponent } from './recreate-order/recreate-order.component';


@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent implements OnInit {
  typeOfSearch :any = "";
  searchInput :any = "";

  isLoading=true
  public cancelledOrders;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Order Date", "Note","Total Product Selling Amount","Customer Name","Customer Code","Status", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //search customer name details
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  customerCtrl = new FormControl();
  filteredCustomers: Observable<string[]>;
  customers: string[] = [];
  allCustomers: any[] = [];
  @ViewChild("customerInput",{static: false}) customerInput: ElementRef;

  constructor(
    private dialog: MatDialog,
    private CancelledOrdersService: CancelledOrdersService,
    public authService : AuthService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.CancelledOrdersService.getAllCancelledOrders().subscribe((order: any) => {
      this.isLoading = false;
      this.cancelledOrders = new MatTableDataSource(order);
      this.cancelledOrders.sort = this.sort;
      this.cancelledOrders.paginator = this.paginator;
    });
    this.CancelledOrdersService.getCustomers().subscribe((response :any)=>{
      this.allCustomers=response;
      this.customerCtrl.valueChanges.subscribe(search => {
        this.filteredCustomers = of(this.allCustomers.filter(item =>
          item.Customer_Name.toLowerCase().includes(search)
        ));
      });
    });
  }

  /***********Customer */
  /********add customer */
  addCustomer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || "").trim()) {
      this.customers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.customerCtrl.setValue(null);
  }
  /********remove customer */
  removeCustomer(customer: string): void {
    const index = this.customers.indexOf(customer);

    if (index >= 0) {
      this.customers.splice(index, 1);
    }
  }
/***********select customer */
  selectedCustomer(event: MatAutocompleteSelectedEvent): void {
    
    if(this.customers.length == 0){
      this.customers.push(event.option.viewValue);
      this.customerInput.nativeElement.value = "";
    }
  
  }
/*******filter customer */
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(
      customer => customer.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  
  onSearchClear() {
    this.searchKey = "";
  }
  search() {
    this.isLoading = true ;
    console.log("typeOfSearch",this.typeOfSearch);
    console.log("searchInput",this.searchInput);
    let foundOrders = [];
    this.CancelledOrdersService.getAllCancelledOrders().subscribe((orders: any) => {
      orders.forEach((assignedOrder:any)=>{
        if(this.typeOfSearch == 'Order_Code'){
          if(assignedOrder.Order_Code == parseInt(this.searchInput)){
            console.log("assignedOrder",assignedOrder)
            foundOrders.push(assignedOrder)
            this.initializeTableBysearchedResult(foundOrders)
          }
        }else if(this.typeOfSearch == 'Customer_Name'){
          if(assignedOrder.Order_Customer.Customer_Name == this.customerCtrl.value.Customer_Name)
            foundOrders.push(assignedOrder)
        } else if(this.typeOfSearch == 'Mobile'){
          if(assignedOrder.Order_Customer.Address.Mobile == this.searchInput)
            foundOrders.push(assignedOrder)
        } 
      });
      if(this.typeOfSearch == 'Order_Code' && foundOrders.length == 0  )
        this.initializeTableBysearchedResult([])
      if(this.typeOfSearch == 'Customer_Name' || this.typeOfSearch == 'Mobile' )
        this.initializeTableBysearchedResult(foundOrders)
      })
        
    
    
  }
  initializeTableBysearchedResult(orders){
    console.log("orders",orders)
    this.isLoading = false;
    this.cancelledOrders = new MatTableDataSource(orders);
    this.cancelledOrders.sort = this.sort;
    this.cancelledOrders.paginator = this.paginator;
  }
  ReCreateOrder(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "ReCreate Order",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(RecreateOrderComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

}
