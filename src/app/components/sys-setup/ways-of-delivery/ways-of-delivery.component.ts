import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { WaysOfDeliveryService } from '../services/ways-of-delivery.service';
import { WaysOfDeliveryFormComponent } from './ways-of-delivery-form/ways-of-delivery-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-ways-of-delivery',
  templateUrl: './ways-of-delivery.component.html',
  styleUrls: ['./ways-of-delivery.component.css']
})
export class WaysOfDeliveryComponent implements OnInit {

  waysOfDeliveries;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private waysOfDeliveryService: WaysOfDeliveryService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.waysOfDeliveryService.getWaysOfDelivery().subscribe((waysOfDeliveries: []) => {
      this.isLoading = false;
      this.waysOfDeliveries = new MatTableDataSource(waysOfDeliveries);
      this.waysOfDeliveries.sort = this.sort;
      this.waysOfDeliveries.paginator = this.paginator;
    });
  }
  onAdd() {
    this.waysOfDeliveryService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Way Of Delivery" };
    let dialogRef=this.dialog.open(WaysOfDeliveryFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.waysOfDeliveryService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Way Of Delivery",id:element._id };

    let dialogRef=this.dialog.open(WaysOfDeliveryFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.searchKey)
      this.waysOfDeliveries.filter = this.searchKey.trim().toLowerCase();
  }


}
