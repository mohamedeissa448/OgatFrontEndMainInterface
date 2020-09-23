import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ManageOrderService } from '../services/manage-order.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  isLoading=true
  public orders;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Order Date", "Note","Total Product Selling Amount","Customer Name","Customer Code","Status", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private manageOrderService: ManageOrderService,
    public authService : AuthService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.manageOrderService.getAllOrdersExceptCancelledOnes().subscribe((order: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(order);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }
  /*onAdd() {
    //this.manageOrderService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Order" };
    let dalogRef=this.dialog.open(OrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    //this.manageOrderService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit An Order",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(OrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }*/

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.orders.filter = this.searchKey.trim().toLowerCase();
  }
  AssignTaskTo(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Assign Task",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(OrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  /*openBillingAddress(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Customer's Billing Address",id:element._id,Order_Code:element.Order_Code,Customer_Name:element.Customer_Name };

    let dalogRef=this.dialog.open(BillingAddressFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  openShippingAddress(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Customer's Shipping Address",id:element._id,Order_Code:element.Order_Code,Customer_Name:element.Customer_Name };

    let dalogRef=this.dialog.open(ShippingAddressFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }*/

}
