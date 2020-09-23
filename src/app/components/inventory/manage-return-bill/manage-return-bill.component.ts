import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { BillService } from '../services/bill.service';
import { ReturnBillService } from '../services/return-bill.service';
import { AddReturnBillFormComponent } from './add-return-bill-form/add-return-bill-form.component';
import { EditReturnBillFormComponent } from './edit-return-bill-form/edit-return-bill-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-manage-return-bill',
  templateUrl: './manage-return-bill.component.html',
  styleUrls: ['./manage-return-bill.component.css']
})
export class ManageReturnBillComponent implements OnInit {

  returnedbills;
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
    private returnBillService: ReturnBillService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.returnBillService.getSupplierReturnBills().subscribe((bills: []) => {
      this.isLoading = false;
      this.returnedbills = new MatTableDataSource(bills);
      this.returnedbills.sort = this.sort;
      this.returnedbills.paginator = this.paginator;
    });
  }
  onAdd() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Return Bill" };
    let dialogRef=this.dialog.open(AddReturnBillFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit Return Bill",id:element._id };

    let dialogRef=this.dialog.open(EditReturnBillFormComponent, dialogConfig);
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
      this.returnedbills.filter = this.searchKey.trim().toLowerCase();
  }

}
