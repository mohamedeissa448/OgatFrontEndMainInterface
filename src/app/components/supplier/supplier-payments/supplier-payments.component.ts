import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { SupplierPaymentsService } from '../services/supplier-payments.service';
import { SupplierPaymentFormComponent } from '../supplier-payment-form/supplier-payment-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-supplier-payments',
  templateUrl: './supplier-payments.component.html',
  styleUrls: ['./supplier-payments.component.css']
})
export class SupplierPaymentsComponent implements OnInit {

  isLoading=true
  public suppliersPayments;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Date","Supplier", "Payment Method","Amount","Done By", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private supplierPaymentService: SupplierPaymentsService,
    public authService :AuthService

  ) {}

  ngOnInit() {
    if(this.authService.currentUser.User_Permissions.includes('canVewSuppliersPayments'))
      this.initializeTable();
  }
  initializeTable() {
    this.supplierPaymentService.getSuppliersPayments().subscribe((suppliersPayments: any) => {
      this.isLoading = false;
      this.suppliersPayments = new MatTableDataSource(suppliersPayments);
      this.suppliersPayments.sort = this.sort;
      this.suppliersPayments.paginator = this.paginator;
    });
  }
  onAdd() {
    this.supplierPaymentService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Payment" };
    let dalogRef=this.dialog.open(SupplierPaymentFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    this.supplierPaymentService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit A Payment",id:element._id };

    let dalogRef=this.dialog.open(SupplierPaymentFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.suppliersPayments.filter = this.searchKey.trim().toLowerCase();
  }
 

}
