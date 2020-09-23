import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { SizeVariantsService } from '../services/size-variants.service';
import { SizeVariantsFormComponent } from './size-variants-form/size-variants-form.component';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-size-variants',
  templateUrl: './size-variants.component.html',
  styleUrls: ['./size-variants.component.css']
})
export class SizeVariantsComponent implements OnInit {

  sizes;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Identifier",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sizeService: SizeVariantsService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.sizeService.getSizes().subscribe((sizes: []) => {
      this.isLoading = false;
      this.sizes = new MatTableDataSource(sizes);
      this.sizes.sort = this.sort;
      this.sizes.paginator = this.paginator;
    });
  }
  onAdd() {
    this.sizeService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Size" };
    let dialogRef=this.dialog.open(SizeVariantsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.sizeService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Size",id:element._id };

    let dialogRef=this.dialog.open(SizeVariantsFormComponent, dialogConfig);
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
      this.sizes.filter = this.searchKey.trim().toLowerCase();
  }

}
