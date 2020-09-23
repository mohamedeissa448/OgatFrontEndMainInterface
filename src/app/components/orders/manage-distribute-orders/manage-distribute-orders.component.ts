import{Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {  MatAutocompleteSelectedEvent,MatChipInputEvent, MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../authentication/services/auth.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { AssignOrderToEmployeeComponent } from './assign-order-to-employee/assign-order-to-employee.component';
import { DistributeOrdersService } from '../services/distribute-orders.service';
@Component({
  selector: 'app-manage-distribute-orders',
  templateUrl: './manage-distribute-orders.component.html',
  styleUrls: ['./manage-distribute-orders.component.css']
})
export class ManageDistributeOrdersComponent implements OnInit {

  typeOfSearch :any = "";
  searchInput :any = "";

  isLoading=true
   createdOrders;
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
    private distributeOrdersService: DistributeOrdersService,
    public authService : AuthService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.distributeOrdersService.getAllCreatedOrders().subscribe((order: any) => {
      this.isLoading = false;
      this.createdOrders = new MatTableDataSource(order);
      this.createdOrders.sort = this.sort;
      this.createdOrders.paginator = this.paginator;
    });
    this.distributeOrdersService.getCustomers().subscribe((response :any)=>{
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
    this.distributeOrdersService.getAllCreatedOrders().subscribe((orders: any) => {
      orders.forEach((createdOrder:any)=>{
        if(this.typeOfSearch == 'Order_Code'){
          if(createdOrder.Order_Code == parseInt(this.searchInput)){
            console.log("createdOrder",createdOrder)
            foundOrders.push(createdOrder)
            this.initializeTableBysearchedResult(foundOrders)
          }
        }else if(this.typeOfSearch == 'Customer_Name'){
          if(createdOrder.Order_Customer.Customer_Name == this.customerCtrl.value.Customer_Name)
            foundOrders.push(createdOrder)
        } else if(this.typeOfSearch == 'Mobile'){
          if(createdOrder.Order_Customer.Address.Mobile == this.searchInput)
            foundOrders.push(createdOrder)
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
    this.createdOrders = new MatTableDataSource(orders);
    this.createdOrders.sort = this.sort;
    this.createdOrders.paginator = this.paginator;
  }
  AssignTaskTo(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Assign Task",id:element._id,Order_Code:element.Order_Code };

   let dalogRef=this.dialog.open(AssignOrderToEmployeeComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
     this.initializeTable();
    })
  }
}
