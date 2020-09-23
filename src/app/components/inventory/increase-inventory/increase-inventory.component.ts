import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { IncreaseInventoryService } from '../services/increase-inventory.service';
import { IncreaseInventoryAddFormComponent } from './increase-inventory-add-form/increase-inventory-add-form.component';
import { IncreaseInventoryEditFormComponent } from './increase-inventory-edit-form/increase-inventory-edit-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-increase-inventory',
  templateUrl: './increase-inventory.component.html',
  styleUrls: ['./increase-inventory.component.css']
})
export class IncreaseInventoryComponent implements OnInit {

  increaseInventories;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "Date",
    "Note",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private increaseInventoryService: IncreaseInventoryService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.increaseInventoryService.getIncreaseInventories().subscribe((increaseInventories: []) => {
      this.isLoading = false;
      this.increaseInventories = new MatTableDataSource(increaseInventories);
      this.increaseInventories.sort = this.sort;
      this.increaseInventories.paginator = this.paginator;
    });
  }
  onAdd() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = { title: "Add New Increase Inventory" };
    let dialogRef=this.dialog.open(IncreaseInventoryAddFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = { title: "Edit Increase Inventory",id:element._id };

    let dialogRef=this.dialog.open(IncreaseInventoryEditFormComponent, dialogConfig);
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
      this.increaseInventories.filter = this.searchKey.trim().toLowerCase();
  }

}
