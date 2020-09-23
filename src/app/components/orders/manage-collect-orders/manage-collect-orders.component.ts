import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { CollectOrdersService } from '../services/collect-orders.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { CollectOrderFormComponent } from './collect-order-form/collect-order-form.component';

@Component({
  selector: 'app-manage-collect-orders',
  templateUrl: './manage-collect-orders.component.html',
  styleUrls: ['./manage-collect-orders.component.css']
})
export class ManageCollectOrdersComponent implements OnInit {

  isLoading=false;
  searchInput:any = "" ;
  typeOfSearch:any = "" ;
  public orders;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Code","Order Date", "Note","Total Product Selling Amount","Customer Name","Status", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private CollectOrdersService: CollectOrdersService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.CollectOrdersService.getAllShippedOrders().subscribe((shippedOrders :any)=>{
      this.isLoading = false;
      this.orders = new MatTableDataSource(shippedOrders);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    })
   
  }
 

  onSearchClear() {
    this.searchKey = "";
  }
  search() {
    this.isLoading = true
    console.log("typeOfSearch",this.typeOfSearch);
    console.log("searchInput",this.searchInput);
    let dataToSend:any = {};
    dataToSend[this.typeOfSearch] = this.searchInput;
    this.CollectOrdersService.searchOrders(dataToSend).subscribe((response:any)=>{
      if(response.message){
        //it means we find one or many orders
        this.isLoading = false;
        this.orders = new MatTableDataSource(response.orders);
        this.orders.sort = this.sort;
        this.orders.paginator = this.paginator;
      }else{
        //we find nothing
        this.isLoading = false;
        this.orders = new MatTableDataSource([]);
        this.orders.sort = this.sort;
        this.orders.paginator = this.paginator;
      }
    })
  }
 
  collectOrder(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Collect Order",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(CollectOrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }


}
