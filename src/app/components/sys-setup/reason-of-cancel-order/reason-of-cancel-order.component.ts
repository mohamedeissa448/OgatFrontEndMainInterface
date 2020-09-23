import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { ReasonOfCancelOrderService } from '../services/reason-of-cancel-order.service';
import { CancelFormComponent } from './cancel-form/cancel-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-reason-of-cancel-order',
  templateUrl: './reason-of-cancel-order.component.html',
  styleUrls: ['./reason-of-cancel-order.component.css']
})
export class ReasonOfCancelOrderComponent implements OnInit {

  reasons;
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
    private cancelReasonService: ReasonOfCancelOrderService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.cancelReasonService.getReasons().subscribe((classes: []) => {
      this.isLoading = false;
      this.reasons = new MatTableDataSource(classes);
      this.reasons.sort = this.sort;
      this.reasons.paginator = this.paginator;
    });
  }
  onAdd() {
    this.cancelReasonService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Reason" };
    let dialogRef=this.dialog.open(CancelFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.cancelReasonService.popualteForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Reason",id:element._id };

    let dialogRef=this.dialog.open(CancelFormComponent, dialogConfig);
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
      this.reasons.filter = this.searchKey.trim().toLowerCase();
  }



}
