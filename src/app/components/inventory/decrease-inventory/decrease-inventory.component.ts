import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { DecreaseInventoryService } from '../services/decrease-inventory.service';
import { DecreaseInventoryAddFormComponent } from './decrease-inventory-add-form/decrease-inventory-add-form.component';
import { DecreaseInventoryEditFormComponent } from './decrease-inventory-edit-form/decrease-inventory-edit-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-decrease-inventory',
  templateUrl: './decrease-inventory.component.html',
  styleUrls: ['./decrease-inventory.component.css']
})
export class DecreaseInventoryComponent implements OnInit {

  decreaseInventories;
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
    private decreaseInventoryService: DecreaseInventoryService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.decreaseInventoryService.getDecreaseInventories().subscribe((decreaseInventories: []) => {
      this.isLoading = false;
      this.decreaseInventories = new MatTableDataSource(decreaseInventories);
      this.decreaseInventories.sort = this.sort;
      this.decreaseInventories.paginator = this.paginator;
    });
  }
  onAdd() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = { title: "Add New Decrease Inventory" };
    let dialogRef=this.dialog.open(DecreaseInventoryAddFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.data = { title: "Edit Decrease Inventory",id:element._id };

    let dialogRef=this.dialog.open(DecreaseInventoryEditFormComponent, dialogConfig);
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
      this.decreaseInventories.filter = this.searchKey.trim().toLowerCase();
  }


}
