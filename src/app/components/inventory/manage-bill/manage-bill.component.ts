import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { BillService } from '../services/bill.service';
import { BillAddFormComponent } from './bill-add-form/bill-add-form.component';
import { EditBillFormComponent } from './edit-bill-form/edit-bill-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.css']
})
export class ManageBillComponent implements OnInit {

  bills;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "Date",
    "Supplier",
    "Note",
    "Done By",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private billService: BillService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.billService.getSupplierBills().subscribe((bills: []) => {
      this.isLoading = false;
      this.bills = new MatTableDataSource(bills);
      this.bills.sort = this.sort;
      this.bills.paginator = this.paginator;
    });
  }
  onAdd() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = { title: "Add New Bill" };
    let dialogRef=this.dialog.open(BillAddFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = { title: "Edit Bill",id:element._id };

    let dialogRef=this.dialog.open(EditBillFormComponent, dialogConfig);
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
      this.bills.filter = this.searchKey.trim().toLowerCase();
  }

}
