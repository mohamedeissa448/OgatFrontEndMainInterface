import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { PaymentMethodsService } from '../services/payment-methods.service';
import { PaymentMethodsFormComponent } from './payment-methods-form/payment-methods-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  paymentMethods;
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
    private paymentMethodsService: PaymentMethodsService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.paymentMethodsService.getPaymentMethods().subscribe((paymentMethods: []) => {
      this.isLoading = false;
      this.paymentMethods = new MatTableDataSource(paymentMethods);
      this.paymentMethods.sort = this.sort;
      this.paymentMethods.paginator = this.paginator;
    });
  }
  onAdd() {
    this.paymentMethodsService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Payment Method" };
    let dialogRef=this.dialog.open(PaymentMethodsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.paymentMethodsService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Payment Method",id:element._id };

    let dialogRef=this.dialog.open(PaymentMethodsFormComponent, dialogConfig);
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
      this.paymentMethods.filter = this.searchKey.trim().toLowerCase();
  }


}
